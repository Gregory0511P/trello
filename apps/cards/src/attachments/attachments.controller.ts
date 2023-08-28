import {Controller} from '@nestjs/common';
import {AttachmentsService} from './attachments.service';
import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {Attachment} from "@app/common";


@Controller()
export class AttachmentsController {
    constructor(private readonly attachmentsService: AttachmentsService) {
    }

    @MessagePattern({cmd: 'create-attachment'})
    async create(@Payload() payload): Promise<Attachment> {
        return await this.attachmentsService.create(payload.attachmentCreateDto);
    };

    @MessagePattern({cmd: 'get-all-attachments'})
    async getAll(): Promise<Array<Attachment>> {
        return await this.attachmentsService.getAll();
    };

    @MessagePattern({cmd: 'get-attachment-by-id'})
    async getById(@Payload() payload): Promise<Attachment> {
        return await this.attachmentsService.getById(payload.id);
    };

    @MessagePattern({cmd: 'get-attachment-by-card-id'})
    async getByCarId(@Payload() payload): Promise<Array<Attachment>> {
        return await this.attachmentsService.getByCardId(payload.carId);
    };

    @MessagePattern({cmd: 'get-attachment-by-filename'})
    async getByFileName(@Payload() payload): Promise<Attachment> {
        return await this.attachmentsService.getByFileName(payload.fileName);
    };

    @EventPattern('update-attachment')
    async update(@Payload() payload): Promise<void> {
        await this.attachmentsService.update(payload.attachmentUpdateDto, payload.id);
    };

    @EventPattern('delete-attachment')
    async delete(@Payload() payload): Promise<void> {
        await this.attachmentsService.delete(payload.id);
    };
}
