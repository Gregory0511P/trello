import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {CheckList} from "../checkList/checkList.entity";

@Entity('check_list_item')
export class CheckListItem {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    title: string;

    @ManyToOne(() => CheckList, checkList => checkList.id)
    @JoinColumn({name: 'checkListId'})
    checkListId: number;

}