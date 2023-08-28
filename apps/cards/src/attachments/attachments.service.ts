import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Attachment, AttachmentCreateDto} from "@app/common";
import {Repository} from "typeorm";
import {AttachmentUpdateDto} from "@app/common/dto/attachmentDto/attachmentUpdate.dto";


@Injectable()
export class AttachmentsService {

    constructor(@InjectRepository(Attachment) private readonly attachmentRepository: Repository<Attachment>) {
    }

    async create(attachmentCreateDto: AttachmentCreateDto): Promise<Attachment> {
        const attachment = await this.attachmentRepository.create(attachmentCreateDto);
        await this.attachmentRepository.save(attachment);
        return attachment;
    };

    async getAll(): Promise<Array<Attachment>> {
        const attachments = await this.attachmentRepository.find();
        return attachments;
    };

    async getById(id: number): Promise<Attachment> {
        const attachment = await this.attachmentRepository.findOne({where: {id: id}});
        return attachment;
    };

    async getByCardId(cardId: number): Promise<Array<Attachment>> {
        const attachments = await this.attachmentRepository.find({where: {cardId: cardId}});
        return attachments;
    };

    async getByFileName(fileName: string): Promise<Attachment> {
        const attachment = await this.attachmentRepository.findOne({where: {fileName: fileName}});
        return attachment;
    };

    async update(attachmentUpdateDto: AttachmentUpdateDto, id: number): Promise<void> {
        await this.attachmentRepository.update(id, attachmentUpdateDto);
    };

    async delete(id: number): Promise<void> {
        await this.attachmentRepository.delete(id);
    };
}
