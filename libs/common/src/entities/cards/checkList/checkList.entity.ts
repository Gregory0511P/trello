import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CardEntity} from "../cardEntity/card.entity";
import {CheckListItem} from "../checkList/checkListItem.entity";

@Entity('check_lists')
export class CheckList {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    title: string;

    @ManyToOne(() => CardEntity, card => card.checkLists)
    @JoinColumn({name: 'cardId'})
    cardId: number;

    @OneToMany(() => CheckListItem, checkListItem => checkListItem.checkListId)
    checkListItems: CheckListItem[];
}