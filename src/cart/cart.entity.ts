import { Good } from "src/goods/good.entity";
import { Users } from "src/users/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;
    user: any;
    users: any;

    @ManyToOne(() => Good, (good) => good.cart)
    goodId: Good;
    @ManyToOne(() => Users, (users) => users.cart)
    userId: Users;

}
