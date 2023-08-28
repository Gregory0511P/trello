import {Body, Controller, Delete, Get, Inject, Param, Patch, Post} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {CheckListItem, CheckListItemCreateDto} from "@app/common";
import {Observable} from "rxjs";

@Controller('checklistitem')
export class ApiCheckListItemsController {
    constructor(@Inject('CHECKLISTITEMS') private readonly checkListItemClient: ClientProxy) {
    }

    @Post()
    async create(@Body() checkListItemCreateDto: CheckListItemCreateDto): Promise<Observable<CheckListItem>> {
        return this.checkListItemClient.send({cmd: 'create-check-list-item'}, {checkListItemCreateDto})
    };

    @Get()
    async getAll(): Promise<Observable<CheckListItem[]>> {
        return this.checkListItemClient.send({cmd: 'get-all-check-list-items'}, {});
    };

    @Get('/:id')
    async getById(@Param('id') id: number): Promise<Observable<CheckListItem>> {
        return this.checkListItemClient.send({cmd: 'get-check-list-item-by-id'}, {id});
    };

    @Get('/title/:title')
    async getByTitle(@Param('title') title: string): Promise<Observable<CheckListItem>> {
        return this.checkListItemClient.send({cmd: 'get-check-list-item-by-title'}, {title});
    };

    @Get('/checklistid/:checkListId')
    async getByCheckListId(@Param('checkListId') checkListId: number): Promise<Observable<CheckListItem[]>> {
        return this.checkListItemClient.send({cmd: 'get-check-list-item-by-check-list-id'}, {checkListId});
    };

    @Patch()
    async update(@Body() checkListItemCreateDto: CheckListItemCreateDto, @Body() id: number): Promise<void> {
        await this.checkListItemClient.emit('update-check-list-item', {checkListItemCreateDto, id});
    }

    @Delete('/:id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.checkListItemClient.emit('delete-check-list-item', {id});
    }
}