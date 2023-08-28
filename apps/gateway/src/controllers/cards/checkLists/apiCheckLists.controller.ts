import {Body, Controller, Delete, Get, Inject, Param, Patch, Post} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {Observable} from "rxjs";
import {CheckList, CheckListCreateDto} from "@app/common";

@Controller('checklist')
export class ApiCheckListsController {
    constructor(@Inject('CHECKLISTS') private readonly checkListsClient: ClientProxy) {
    }

    @Post()
    async create(@Body() checkListCreateDto: CheckListCreateDto, @Body() cardId: string): Promise<Observable<CheckList>> {
        return this.checkListsClient.send({cmd: 'create-check-list'}, {checkListCreateDto, cardId});
    };

    @Get()
    async getAll(): Promise<Observable<CheckList[]>> {
        return this.checkListsClient.send({cmd: 'get-all-check-lists'}, {});
    };

    @Get('/:id')
    async getAllById(@Param('id') id: string): Promise<Observable<CheckList>> {
        return this.checkListsClient.send({cmd: 'get-check-list-by-id'}, {id});
    };

    @Get('/title/:title')
    async getByTitle(@Param('title') title: string): Promise<Observable<CheckList>> {
        return this.checkListsClient.send({cmd: 'get-check-list-by-title'}, {title});
    };

    @Get('/cardid/:id')
    async getByCardId(@Param('id') id: string): Promise<Observable<CheckList[]>> {
        return this.checkListsClient.send({cmd: 'get-check-list-by-card-id'}, {id});
    };

    /*@Patch()
    async update(@Body() checkListCreateDto: CheckListCreateDto, @Body() id: string):
        Promise<Observable<CheckList>> {
        return this.checkListsClient.send({cmd: 'update-check-list'}, {checkListCreateDto, id});
    };

    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<Observable<CheckList>> {
        return this.checkListsClient.send({cmd: 'delete-check-list'}, {id});
    }*/

    @Patch()
    async update(@Body() checkListCreateDto: CheckListCreateDto, @Body() id: string):
        Promise<void> {
        await this.checkListsClient.emit('update-check-list', {checkListCreateDto, id});
    };

    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<void> {
        await this.checkListsClient.emit('delete-check-list', {id});
    }
}