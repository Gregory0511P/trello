import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "../userEntity/user.entity";
@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;

    @CreateDateColumn({name: 'created_at', type: "timestamp"})
    createAt: Date;

    @UpdateDateColumn({name: 'updated_at', type: "timestamp"})
    updatedAt: Date;

    @OneToMany(() => User, user => user.role)
    users: User[];
}