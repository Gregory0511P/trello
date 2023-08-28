import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CheckListItem, CheckListItemCreateDto} from "@app/common";
import {Repository} from "typeorm";

@Injectable()
export class CheckListItemService {
    constructor(@InjectRepository(CheckListItem) private readonly checkListItemRepository: Repository<CheckListItem>) {
    }

    async create(checkListCreateDto: CheckListItemCreateDto): Promise<CheckListItem> {
        const checkListItem = await this.checkListItemRepository.create(checkListCreateDto);
        await this.checkListItemRepository.save(checkListItem);
        return checkListItem;
    };

    async getAll(): Promise<Array<CheckListItem>> {
        const checkListItems = await this.checkListItemRepository.find();
        return checkListItems;
    };

    async getById(id: number): Promise<CheckListItem> {
        const checkListItem = await this.checkListItemRepository.findOne({where: {id: id}});
        return checkListItem;
    };

    async getByTitle(title: string): Promise<CheckListItem> {
        const checkListItem = await this.checkListItemRepository.findOne({where: {title: title}});
        return checkListItem;
    };

    async getByCheckListId(checkListId: number): Promise<Array<CheckListItem>> {
        const checkListItems = await this.checkListItemRepository.find({where: {checkListId: checkListId}});
        return checkListItems;
    };

    async update(checkListCreateDto: CheckListItemCreateDto, id: number): Promise<void> {
        await this.checkListItemRepository.update(id, checkListCreateDto);
    };

    async delete(id: number): Promise<void> {
        await this.checkListItemRepository.delete(id);
    };
}