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

@Entity('labels')
export class Label {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    color: string;

    @CreateDateColumn({name: 'created_at', type: "timestamp"})
    createAt: Date;

    @UpdateDateColumn({name: 'updated_at', type: "timestamp"})
    updatedAt: Date;

    @ManyToOne(() => CardEntity, card => card.labels)
    @JoinColumn({name: 'cardId'})
    cardId: number;
}