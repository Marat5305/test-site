import { Good } from "src/goods/good.entity";
import { Users } from "src/users/user.entity";
import { UsersController } from "src/users/users.controller";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Raitings {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Good, (good) => good.raitings) 
    goodId: Good;
    @ManyToOne(() => Users, (user) => user.raitings)
    userId: Users;
    raiting: number;
    user: any;
    users: any;

}