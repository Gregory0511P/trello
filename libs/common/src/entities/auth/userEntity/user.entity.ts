import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, ManyToOne,

    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Role} from "../roleEntity/role.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'username', nullable: false})
    userName: string;

    @Column({nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({default: false})
    archived: boolean;

    @CreateDateColumn({name: 'created_at', type: "timestamp"})
    createAt: Date;

    @UpdateDateColumn({name: 'updated_at', type: "timestamp"})
    updatedAt: Date;

    //@Column({name: 'role_id', nullable: true})
    //roleId: number;

    @ManyToOne(() => Role, role => role)
    @JoinColumn()
    role: Role;
}