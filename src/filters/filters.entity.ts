import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/* Структура: 
    запись: айди, поле "тип", поле "фильтрТип"
    поле "фильтрТип" хранит в себе тип фильтра (изготовитель, тип запчасти и т.д.)
    поле "фильтр" хранит в себе названия, разделённые запятой
    Пример: 0 -> manufacturer -> Произ1, Произв2, Произв3 
 */

@Entity()
export class Filters {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filterType: string;

    @Column({ nullable: true })
    filters: string;
}