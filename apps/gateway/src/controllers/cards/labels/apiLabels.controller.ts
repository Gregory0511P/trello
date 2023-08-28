import {Body, Controller, Delete, Get, Inject, Param, Patch, Post} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {Label, LabelCreateDto} from "@app/common";
import {Observable} from "rxjs";

@Controller('labels')
export class ApiLabelsController {
    constructor(@Inject('LABELS') private readonly labelsClient: ClientProxy) {
    }

    @Post()
    async create(@Body() labelCreateDto: LabelCreateDto, @Body() cardId: number): Promise<Observable<Label>> {
        return this.labelsClient.send({cmd: 'create-label'}, {labelCreateDto, cardId})
    }

    @Get()
    async getAll(): Promise<Observable<Label[]>> {
        return this.labelsClient.send({cmd: 'get-all-labels'}, {});
    };

    @Get('/:id')
    async getAllById(@Param('id') id: number): Promise<Observable<Label>> {
        return this.labelsClient.send({cmd: 'get-label-by-id'}, {id});
    };

    @Get('/title/:title')
    async getByTitle(@Param('title') title: string): Promise<Observable<Label>> {
        return this.labelsClient.send({cmd: 'get-label-by-title'}, {title});
    };

    @Get('/cardid/:id')
    async getByCardId(@Param('id') id: number): Promise<Observable<Label[]>> {
        return this.labelsClient.send({cmd: 'get-labels-by-card-id'}, {id});
    };

    @Patch()
    async update(@Body() labelCreateDto: LabelCreateDto, @Body() id: number): Promise<void> {
        await this.labelsClient.emit('update-label', {labelCreateDto, id});
    };

    @Delete('/:id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.labelsClient.emit('delete-label', {id});
    };
}