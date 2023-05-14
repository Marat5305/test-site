import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Good } from './good.entity';

@Entity()

export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name: string;

    @OneToMany(type => Good, good => good.id) goods: Good[];

}