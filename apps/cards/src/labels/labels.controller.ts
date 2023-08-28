import {Controller} from '@nestjs/common';
import {LabelsService} from "./labels.service";
import {Ctx, EventPattern, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {Label} from "@app/common";


@Controller()
export class LabelsController {
    constructor(private readonly labelsService: LabelsService) {
    }

    @MessagePattern({cmd: 'create-label'})
    async create(@Payload() payload): Promise<Label> {
        return await this.labelsService.create(payload.labelCreateDto);
    };

    @MessagePattern({cmd: 'get-all-labels'})
    async getAll(): Promise<Array<Label>> {
        return await this.labelsService.getAll();
    };

    @MessagePattern({cmd: 'get-label-by-id'})
    async getById(@Payload() payload): Promise<Label> {
        return await this.labelsService.getById(payload.id);
    };

    @MessagePattern({cmd: 'get-label-by-title'})
    async getByTitle(@Payload() payload): Promise<Label> {
        return await this.labelsService.getByTitle(payload.title);
    };

    @EventPattern('update-label')
    async update(@Payload() payload): Promise<void> {
        await this.labelsService.update(payload.labelCreateto, payload.id);
    };

    @EventPattern('delete-label')
    async delete(@Payload() payload): Promise<void> {
        await this.labelsService.delete(payload.id);
    };
}
