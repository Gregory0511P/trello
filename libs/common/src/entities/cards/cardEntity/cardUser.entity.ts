import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('card_user')
export class CarDUser {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'card_id'})
    cardId: number;

    @Column({name: 'user_id'})
    userId: number;
}