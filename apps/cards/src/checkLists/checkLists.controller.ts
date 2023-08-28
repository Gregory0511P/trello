import {Controller} from '@nestjs/common';
import {CheckListsService} from './checkLists.service';
import {Ctx, EventPattern, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {CheckList} from "@app/common";


@Controller()
export class CheckListsController {
    constructor(private readonly cardsService: CheckListsService) {
    }

    @MessagePattern({cmd: 'create-check-list'})
    async create(@Ctx() context: RmqContext,
                 @Payload() payload): Promise<CheckList> {
        return await this.cardsService.create(payload.labelCreateDto);
    };

    @MessagePattern({cmd: 'get-all-check-lists'})
    async getAll(): Promise<Array<CheckList>> {
        return await this.cardsService.getAll();
    };

    @MessagePattern({cmd: 'get-check-list-by-id'})
    async getById(@Ctx() context: RmqContext,
                  @Payload() payload): Promise<CheckList> {
        return await this.cardsService.getById(payload.id);
    };

    @MessagePattern({cmd: 'get-check-list-by-title'})
    async getByTitle(@Ctx() context: RmqContext,
                     @Payload() payload): Promise<CheckList> {
        return await this.cardsService.getByTitle(payload.title);
    };

    @MessagePattern({cmd: 'get-check-list-by-card-id'})
    async getByCardId(@Ctx() context: RmqContext,
                      @Payload() payload): Promise<Array<CheckList>> {
        return await this.cardsService.getByCardId(payload.cardId);
    };

    @EventPattern('update-check-list')
    async update(@Payload() payload): Promise<void> {
        await this.cardsService.update(payload.labelCreateDto, payload.id);
    };

    @EventPattern('delete-check-list')
    async delete(@Payload() payload): Promise<void> {
        await this.cardsService.delete(payload.id);
    };
}
