import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;
}
