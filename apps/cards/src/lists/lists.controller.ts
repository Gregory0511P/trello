import {Controller} from '@nestjs/common';
import {ListsService} from './lists.service';
import {EventPattern, MessagePattern, Payload} from '@nestjs/microservices';
import {ListEntity} from "@app/common";
import {ListCreateDto, ListUpdateDto} from "@app/common";


@Controller()
export class ListsController {
  constructor(private readonly listService: ListsService) {
  }

  @MessagePattern('get-lists-by-board-id')
  async getListsByBoardId(@Payload() boardId: number): Promise<ListEntity[]> {
    return this.listService.getListsByBoardId(boardId);
  }

  @MessagePattern('createList')
  async create(@Payload() data: ListCreateDto): Promise<ListEntity> {
    return this.listService.create(data);
  }

  @EventPattern('updateList')
  async update(@Payload() data: ListUpdateDto): Promise<void> {
    await this.listService.update(data);
  }

  @EventPattern('deleteList')
  async delete(@Payload() listId: number): Promise<void> {
    await this.listService.delete(listId);
  }
}