import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {CardEntity} from "../cardEntity/card.entity";
import {Comment} from "../commentEntity/comment.entity";

@Entity('attachments')
export class Attachment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'file_name'})
    fileName: string;

    @Column({name: 'file_path'})
    filePath: string;

    @CreateDateColumn({name: 'created_at', type: "timestamp"})
    createAt: Date;

    @UpdateDateColumn({name: 'updated_at', type: "timestamp"})
    updatedAt: Date;

    @ManyToOne(() => CardEntity, card => card.attachments)
    @JoinColumn({name: 'cardId'})
    cardId: number;

    @OneToMany(() => Comment, comment => comment.attachmentId)
    comments: Comment[];
}