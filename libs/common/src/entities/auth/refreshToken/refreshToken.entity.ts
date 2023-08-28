import {Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "../userEntity/user.entity";
import {JoinColumn} from "typeorm";

@Entity('tokens')
export class Token {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    refreshToken: string;

    @CreateDateColumn({name: 'created_at', type: "timestamp"})
    createAt: string;

    @UpdateDateColumn({name: 'updated_at', type: "timestamp"})
    updatedAt: string;

    @OneToOne(() => User, user => user.id, {cascade: true})
    @JoinColumn()
    userId: number;

}