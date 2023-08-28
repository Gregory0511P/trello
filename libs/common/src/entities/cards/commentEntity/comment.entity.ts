import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {CardEntity} from "../cardEntity/card.entity";
import {Attachment} from "../attachmentEntity/attachment.entity";

@Entity('comments')
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'user_id'})
    userId: number;

    @Column()
    comment: string;

    @CreateDateColumn({name: 'created_at', type: "timestamp"})
    createAt: Date;

    @UpdateDateColumn({name: 'updated_at', type: "timestamp"})
    updatedAt: Date;

    @ManyToOne(() => CardEntity, card => card.id)
    @JoinColumn({name: 'cardId'})
    cardId: number;

    @ManyToOne(() => Comment, comment => comment.id)
    children: Comment[];

    @ManyToOne(() => Comment, comment => comment.id)
    @JoinColumn()
    parentId: number;

    @ManyToOne(() => Attachment, attachment => attachment.comments)
    @JoinColumn()
    attachmentId: number;
}