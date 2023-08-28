import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {CheckList, CheckListCreateDto} from "@app/common";
import {Repository} from "typeorm";


@Injectable()
export class CheckListsService {
    constructor(@InjectRepository(CheckList) private readonly checkListRepository: Repository<CheckList>) {
    }

    async create(checkListCreateDto: CheckListCreateDto): Promise<CheckList> {
        const checkList = await this.checkListRepository.create(checkListCreateDto);
        await this.checkListRepository.save(checkList);
        return checkList;
    };

    async getAll(): Promise<Array<CheckList>> {
        const checkList = await this.checkListRepository.find();
        return checkList;
    };

    async getById(id: number): Promise<CheckList> {
        const checkList = await this.checkListRepository.findOne({where: {id: id}});
        return checkList;
    };

    async getByTitle(title: string): Promise<CheckList> {
        const checkList = await this.checkListRepository.findOne({where: {title: title}});
        return checkList;
    };

    async getByCardId(cardId: number): Promise<Array<CheckList>> {
        const checkLists = await this.checkListRepository.find({where: {cardId: cardId}});
        return checkLists;
    }

    async update(checklistCreateDto: CheckListCreateDto, id: number): Promise<void> {
        await this.checkListRepository.update(id, checklistCreateDto);
    };

    async delete(id: number): Promise<void> {
        await this.checkListRepository.delete(id);
    }

}
