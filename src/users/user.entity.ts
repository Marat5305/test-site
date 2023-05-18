import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;


    @Column({nullable: true})
    username: string;

    @Column({nullable: true})
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    email: string;

    @Column({ default: true })
    isActive: boolean;
}