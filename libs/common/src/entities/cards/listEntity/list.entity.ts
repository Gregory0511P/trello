import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {BoardEntity} from "../boardEntity/board.entity";
import {CardEntity} from "../cardEntity/card.entity";
import {ApiProperty} from "@nestjs/swagger";


@Entity('lists')
export class ListEntity extends BaseEntity {
    @ApiProperty({type: Number, description: 'Auto generated Primary Key', example: 1})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({type: String, description: 'List name', example: 'This is list title'})
    @Column()
    title: string;

    @ApiProperty({type: Boolean, description: 'Is list archived', example: false, default: false})
    @Column({default: false})
    archived: boolean;

    @ApiProperty({type: Number, description: 'List position on the board', example: 1})
    @Column()
    position: number;

    @ApiProperty({type: Date, description: 'Date of creation', example: '2023-07-25T16:55:44.671Z'})
    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: Date;

    @ApiProperty({type: Date, description: 'Date of change', example: '2023-07-25T16:55:44.671Z'})
    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updateAt: Date;

    @ManyToOne(() => BoardEntity, (board) => board.id)
    @JoinColumn({name: 'boardId'})
        //было BoardEntity изменил на number и board - boardId
    boardId: number

    @ApiProperty({type: [CardEntity], description: 'cards included in this list'})
    @OneToMany(() => CardEntity, (card) => card.listId)
    cards: CardEntity[]
}