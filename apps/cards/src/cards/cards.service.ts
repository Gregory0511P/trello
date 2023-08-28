import {Injectable} from '@nestjs/common';
import {CardCreateDto, CardUpdateDto} from "@app/common";
import {InjectDataSource, InjectRepository} from "@nestjs/typeorm";
import {DataSource, MoreThan, MoreThanOrEqual, Repository} from "typeorm";
import {RpcException} from "@nestjs/microservices";
import {CardEntity, ListEntity} from "@app/common";

@Injectable()
export class CardsService {

    constructor(
        @InjectRepository(CardEntity) private readonly cardRepository: Repository<CardEntity>,
        @InjectRepository(ListEntity) private readonly listRepository: Repository<ListEntity>,
        private readonly dataSource: DataSource) {}

    checkMicroservice(): any {
        return {title: 'cards', message: 'микросервис запущен'};
    }

    async getCardsByBoardId(boardId: number): Promise<ListEntity[]> {
        const boardCards = await this.listRepository.find({
            relations: {
                cards: true
            },
            where: {
                boardId: boardId
            },
            order: {
                id: 'asc',
                cards: {
                    position: 'asc'
                }
            }
        });

        return boardCards;
    }

    async create(data: CardCreateDto) {
        // добавить проверку на наличие юзера, пока нет таблички
        await this.listExistenceCheck(data.listId);

        const lastPosition = await this.getLastCardPosition(data.listId);

        const createdCard = await this.cardRepository.save({
            position: lastPosition + 1,
            ...data,
        });
        return createdCard
    }

    async update(data: CardUpdateDto) {
        const id = data.id
        delete data.id

        if (data.position) {
            const newCardPosition = data.position;
            const newListId = data.listId;
            const currentCardPosition = await this.getCardPositionById(id);
            const currentListId = await this.getListIdByCardId(id);

            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.startTransaction();

            try {
                const cardsReducePositions = await queryRunner.manager.find(CardEntity, {
                    select: {
                        position: true,
                        id: true
                    },
                    where: {
                        listId: currentListId,
                        position: MoreThan(currentCardPosition)
                    }
                });

                const cardsIncreasePositions = await queryRunner.manager.find(CardEntity, {
                    select: {
                        position: true,
                        id: true
                    },
                    where: {
                        listId: newListId,
                        position: MoreThanOrEqual(newCardPosition)
                    }
                });

                for (const card of cardsReducePositions) {
                    await queryRunner.manager.update(CardEntity, card.id, {position: card.position - 1});
                }

                for (const card of cardsIncreasePositions) {
                    await queryRunner.manager.update(CardEntity, card.id, {position: card.position + 1});
                }

                await queryRunner.manager.update(CardEntity, id, data);
                await queryRunner.commitTransaction();
            } catch {
                await queryRunner.rollbackTransaction();
            } finally {
                await queryRunner.release();
            }

        } else {
            await this.cardRepository.update(id, data);
        }
    }

    async delete(id: number): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const currentCardPosition = await this.getCardPositionById(id);
            await queryRunner.manager.delete(CardEntity, id)
            const cardsReducePosition = await queryRunner.manager.find(CardEntity, {
                where: {
                    position: MoreThan(currentCardPosition)
                },
                select: {
                    id: true,
                    position: true
                }
            })
            for (const card of cardsReducePosition) {
                await queryRunner.manager.update(CardEntity, card.id, {position: card.position - 1})
            }
            await queryRunner.commitTransaction()
        } catch {
            await queryRunner.rollbackTransaction()
        } finally {
            await queryRunner.release()
        }
    }

    private async listExistenceCheck(listId: number): Promise<void> {
        const isListExists = await this.listRepository.findOne({
            where: {
                id: listId
            }
        })

        if (!isListExists) {
            throw new RpcException('List with this listId does not exists')
        }
    }

    private async getLastCardPosition(listId: number): Promise<number> {
        const lastPosition = await this.cardRepository.findOne({
            where: {
                listId: listId
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

    private async getCardPositionById(cardId: number): Promise<number> {
        const currentCardPosition = await this.cardRepository.findOne({
            where: {
                id: cardId
            },
            select: {
                position: true
            }
        })

        return currentCardPosition.position;
    }

    private async getListIdByCardId(cardId: number) {
        const list = await this.cardRepository.findOne({
            where: {
                id: cardId,
            },
            select: {
                listId: true
            }
        })

        return list.id
    }
}