import {Controller} from "@nestjs/common";
import {CheckListItemService} from "./checkListItem.service";
import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {CheckListItem} from "@app/common";

@Controller()
export class CheckListItemController {
    constructor(private readonly checkListItemsService: CheckListItemService) {
    }

    @MessagePattern({cmd: 'create-check-list-item'})
    async create(@Payload() payload): Promise<CheckListItem> {
        return await this.checkListItemsService.create(payload.checkListItem);
    };

    @MessagePattern({cmd: 'get-all-check-list-item'})
    async getAll(@Payload() payload): Promise<Array<CheckListItem>> {
        return await this.checkListItemsService.getAll();
    };

    @MessagePattern({cmd: 'get-check-list-item-by-id'})
    async getById(@Payload() payload): Promise<CheckListItem> {
        return await this.checkListItemsService.getById(payload.id);
    };

    @MessagePattern({cmd: 'get-check-list-item-by-title'})
    async getByTitle(@Payload() payload): Promise<CheckListItem> {
        return await this.checkListItemsService.getByTitle(payload.title);
    };

    @MessagePattern({cmd: 'get-check-list-item-by-check-list-id'})
    async getByCheckListId(@Payload() payload): Promise<Array<CheckListItem>> {
        return await this.checkListItemsService.getByCheckListId(payload.checkListId);
    };

    @EventPattern('update-check-list-item')
    async update(@Payload() payload): Promise<void> {
        await this.checkListItemsService.update(payload.id, payload.checkListCreateDto);
    };

    @EventPattern('delete-check-list-item')
    async delete(@Payload() payload): Promise<void> {
        await this.checkListItemsService.delete(payload.id);
    }
}