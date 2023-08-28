import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Label, LabelCreateDto} from "@app/common";
import {Repository} from "typeorm";


@Injectable()
export class LabelsService {
    constructor(@InjectRepository(Label) private readonly labelsRepository: Repository<Label>) {
    }

    async create(labelCreateDto: LabelCreateDto): Promise<Label> {
        const label = await this.labelsRepository.create(labelCreateDto);
        await this.labelsRepository.save(label);
        return label;
    };

    async getAll(): Promise<Array<Label>> {
        const labels = await this.labelsRepository.find();
        return labels;
    };

    async getById(id: number): Promise<Label> {
        const label = await this.labelsRepository.findOne({where: {id: id}});
        return label;
    };

    async getByTitle(title: string): Promise<Label> {
        const label = await this.labelsRepository.findOne({where: {title: title}});
        return label;
    };

    async update(labelCreateDto: LabelCreateDto, id: number): Promise<void> {
        await this.labelsRepository.update(+id, labelCreateDto);
    };

    async delete(id: number): Promise<void> {
        await this.labelsRepository.delete(id);
    }
}
