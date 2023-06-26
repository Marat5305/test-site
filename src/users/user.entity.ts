import { Cart } from 'src/cart/cart.entity';
import { Raitings } from 'src/raitings/raitings.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    role: string;

    @Column()
    isactive: boolean;
    @OneToMany(() => Cart, (cart) => cart.users)
    cart: Cart[];
    @OneToMany(() => Raitings, (raitings) => raitings.users)
    raitings: Raitings[];

}