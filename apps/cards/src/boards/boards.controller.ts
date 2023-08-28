import {Controller} from '@nestjs/common';
import {BoardsService} from './boards.service';
import {EventPattern, MessagePattern, Payload} from '@nestjs/microservices';
import {BoardEntity} from "@app/common";
import {BoardCreateDto, BoardUpdateDto} from "@app/common";


@Controller()
export class BoardsController {
    constructor(private readonly boardsService: BoardsService) {
    }

    @MessagePattern('get-boards-by-user-id')
    async getByUserId(@Payload() userId: number): Promise<BoardEntity[]> {
        return this.boardsService.getByUserId(userId);
    }

    @MessagePattern('create-board')
    async create(@Payload() data: BoardCreateDto): Promise<BoardEntity> {
        return this.boardsService.create(data);
    }

    @EventPattern('update-board')
    async updateBoard(@Payload() boardDto: BoardUpdateDto): Promise<void> {
        return this.boardsService.update(boardDto);
    }

    @EventPattern('delete-board')
    async deleteBoard(@Payload() boardId: number): Promise<void> {
        return this.boardsService.delete(boardId);
    }

}