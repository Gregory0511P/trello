import {Injectable} from '@nestjs/common';
import {ListEntity} from "@app/common";
import {RpcException} from '@nestjs/microservices';
import {InjectRepository} from '@nestjs/typeorm';
import {Between, DataSource, MoreThan, Repository} from 'typeorm';
import {BoardEntity} from "@app/common";
import {ListCreateDto, ListUpdateDto} from "@app/common";

@Injectable()
export class ListsService {

    constructor(
        @InjectRepository(ListEntity) private listRepository: Repository<ListEntity>,
        @InjectRepository(BoardEntity) private boardRepository: Repository<BoardEntity>,
        private dataSource: DataSource) {
    }

    async getListsByBoardId(boardId: number): Promise<ListEntity[]> {
        const lists = await this.listRepository.find({
            where: {
                boardId: boardId
            },
            order: {
                position: "asc"
            }
        })
        return lists
    }

    async create(data: ListCreateDto): Promise<ListEntity> {
        await this.boardExistenceCheck(data.boardId);

        const lastPosition = await this.getLastListPosition(data.boardId);

        const savedList = await this.listRepository.save({
            position: lastPosition + 1,
            ...data,
        });

        return savedList
    }

    async update(data: ListUpdateDto): Promise<void> {

        const id = data.id
        delete data.id

        if (data.position) {
            const newListPosition = data.position;
            const currentListPosition = await this.getListPositionById(id);

            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.startTransaction();
            try {
                if (newListPosition > currentListPosition) {
                    const listsToChangePositions = await queryRunner.manager.find(ListEntity, {
                        select: {
                            position: true,
                            id: true
                        },
                        where: {
                            position: Between(currentListPosition + 1, newListPosition)
                        }
                    })
                    for (const list of listsToChangePositions) {
                        await queryRunner.manager.update(ListEntity, list.id, {position: list.position - 1})
                    }
                    await queryRunner.manager.update(ListEntity, id, data)
                    await queryRunner.commitTransaction()

                } else if (newListPosition < currentListPosition) {
                    const listsToChangePositions = await queryRunner.manager.find(ListEntity, {
                        select: {
                            position: true,
                            id: true
                        },
                        where: {
                            position: Between(newListPosition, currentListPosition - 1)
                        }
                    })
                    for (const list of listsToChangePositions) {
                        await queryRunner.manager.update(ListEntity, list.id, {position: list.position + 1})
                    }
                    await queryRunner.manager.update(ListEntity, id, data)
                    await queryRunner.commitTransaction()
                }
            } catch (e) {
                await queryRunner.rollbackTransaction()
            } finally {
                await queryRunner.release()
            }
        } else {
            await this.listRepository.update(id, data)
        }
    }

    async delete(id: number): Promise<any> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const currentListPosition = await this.getListPositionById(id);
            await queryRunner.manager.delete(ListEntity, id)
            const listsToChangePositions = await queryRunner.manager.find(ListEntity, {
                where: {
                    position: MoreThan(currentListPosition)
                },
                select: {
                    id: true,
                    position: true
                }
            })
            for (const list of listsToChangePositions) {
                await queryRunner.manager.update(ListEntity, list.id, {position: list.position - 1})
            }
            await queryRunner.commitTransaction()
        } catch {
            await queryRunner.rollbackTransaction()
        } finally {
            await queryRunner.release()
        }
    }

    private async boardExistenceCheck(boardId: number): Promise<void> {
        const isBoardExists = await this.boardRepository.findOne({
            where: {
                id: boardId
            }
        })

        if (!isBoardExists) {
            throw new RpcException('Board with this boardId does not exists')
        }
    }

    private async getLastListPosition(boardId: number): Promise<number> {
        const lastPosition = await this.listRepository.findOne({
            where: {
                boardId: boardId
            },
            select: {
                position: true
            },
            order: {
                position: "DESC"
            }
        });

        return lastPosition ? lastPosition.position : 0
    }

    private async getListPositionById(listId: number): Promise<number> {
        const currentListPosition = await this.listRepository.findOne({
            where: {
                id: listId
            },
            select: {
                position: true
            }
        })

        return currentListPosition.position;
    }
}
