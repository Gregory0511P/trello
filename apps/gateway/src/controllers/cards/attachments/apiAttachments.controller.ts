import {Body, Controller, Delete, Get, Inject, Param, Patch, Post} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {Attachment, AttachmentCreateDto} from "@app/common";
import {Observable} from "rxjs";
import {AttachmentUpdateDto} from "@app/common/dto/attachmentDto/attachmentUpdate.dto";


@Controller('attachments')
export class ApiAttachmentsController {
    constructor(@Inject('ATTACHMENTS') private readonly attachmentsClient: ClientProxy) {
    }

    @Post()
    async create(@Body() attachmentCreateDto: AttachmentCreateDto, @Body() cardId: number):
        Promise<Observable<Attachment>> {
        return this.attachmentsClient.send({cmd: 'create-attachment'}, {attachmentCreateDto, cardId});
    };

    @Get()
    async getAll(): Promise<Observable<Attachment[]>> {
        return this.attachmentsClient.send({cmd: 'get-all-attachments'}, {});
    };

    @Get('/:id')
    async getById(@Param('id') id: number): Promise<Observable<Attachment>> {
        return this.attachmentsClient.send({cmd: 'get-attachment-by-id'}, {id});
    };

    @Get('/cardid/:cardId')
    async getByCardId(@Param('cardId') cardId: number): Promise<Observable<Attachment[]>> {
        return this.attachmentsClient.send({cmd: 'get-attachment-by-card-id'}, {cardId});
    };

    @Get('/filename/:fileName')
    async getByFileName(@Param('fileName') fileName: string): Promise<Observable<Attachment>> {
        return this.attachmentsClient.send({cmd: 'get-attachment-by-card-id'}, {fileName});
    };

    @Patch()
    async update(@Body() attachmentUpdateDto: AttachmentUpdateDto, @Body() id: number): Promise<void> {
        await this.attachmentsClient.emit('update-attachment', {attachmentUpdateDto, id});
    };

    @Delete('/:id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.attachmentsClient.emit('delete-attachment', {id});
    }
}