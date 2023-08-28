import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {BoardCreateDto, BoardUpdateDto, BoardEntity} from "@app/common";


@Injectable()
export class BoardsService {

    constructor(
        @InjectRepository(BoardEntity)
        private boardRepository: Repository<BoardEntity>,
    ) {
    }

    async getByUserId(userId: number): Promise<any> {
        const board = await this.boardRepository.find({
            where: {
                userId: userId
            },
            order: {
                title: "ASC"
            }
        })
        return board
    }

    async create(data: BoardCreateDto): Promise<BoardEntity> {
        return await this.boardRepository.save(data)
    }

    async update(data: BoardUpdateDto): Promise<any> {

        const id = data.id;
        delete data.id;

        await this.boardRepository.update(id, data);

    }

    async delete(id: number): Promise<any> {
        await this.boardRepository.delete(id);
    }
}