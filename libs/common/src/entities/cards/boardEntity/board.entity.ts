import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import {ListEntity} from "../listEntity/list.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity('boards')
export class BoardEntity extends BaseEntity {
    @ApiProperty({type: Number, description: 'Auto generated Primary Key', example: 1})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({type: Number, description: 'User unique id', example: 1})
    @Column({name: 'user_id'})
    userId: number;

    @ApiProperty({type: String, description: 'Board name', example: 'This is board title'})
    @Column()
    title: string;

    @ApiProperty({type: Date, description: 'Date of creation', example: '2023-07-25T16:55:44.671Z'})
    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: Date;

    @ApiProperty({type: Date, description: 'Date of change', example: '2023-07-25T16:55:44.671Z'})
    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updateAt: Date;

    @OneToMany(() => ListEntity, (list) => list.boardId)
    lists: ListEntity[]
}