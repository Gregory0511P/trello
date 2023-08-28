import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';
import {ListEntity} from "../listEntity/list.entity";
import {Comment} from "../commentEntity/comment.entity";
import {Attachment} from "../attachmentEntity/attachment.entity";
import {ApiProperty} from "@nestjs/swagger";
import {Label} from "../labelEntity/label.entity";
import {CheckList} from "../checkList/checkList.entity";

@Entity('cards')
export class CardEntity extends BaseEntity {
    @ApiProperty({type: Number, description: 'Auto generated Primary Key', example: 1})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({type: Number, description: 'User unique id', example: 1})
    @Column({name: 'user_id'})
    userId: number;

    @ApiProperty({type: [Number], description: 'Users who watch this card', example: [1, 2, 3]})
    @Column('simple-array', {name: 'users_watch', default: ''})
    usersWatch: number[];

    @ApiProperty({type: String, description: 'Card name', example: 'This is card title'})
    @Column()
    title: string;

    @ApiProperty({
        type: String,
        description: 'Card description',
        example: 'instructions for the developer needed to complete the task'
    })
    @Column({nullable: true})
    description: string;

    @ApiProperty({type: Date, description: 'task deadline', example: '2023-07-25T16:55:44.671Z'})
    @Column({nullable: true})
    dueDate: Date;

    @ApiProperty({type: String, description: 'Name of cover image', example: 'cover-image.jpeg'})
    @Column({nullable: true})
    coverImage: string;


    @ApiProperty({type: Boolean, description: 'Is card archived', example: false, default: false})
    @Column({default: false})
    archived: boolean;

    @ApiProperty({type: Number, description: 'Card position in the list', example: 1})
    @Column({nullable: true})
    position: number;

    @ApiProperty({type: Date, description: 'Date of creation', example: '2023-07-25T16:55:44.671Z'})
    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: Date;

    @ApiProperty({type: Date, description: 'Date of change', example: '2023-07-25T16:55:44.671Z'})
    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updateAt: Date;

    @ManyToOne(() => ListEntity, (list) => list.cards)
    @JoinColumn({name: 'listId'})
    listId: number

    @OneToMany(() => Comment, (comment) => comment.cardId)
    comments: Comment[]

    @OneToMany(() => Attachment, (attachment) => attachment.cardId)
    attachments: Attachment[]

    @OneToMany(() => Label, (label) => label.cardId)
    labels: Label[]

    @OneToMany(() => CheckList, (checkList) => checkList.cardId)
    checkLists: CheckList[]
}