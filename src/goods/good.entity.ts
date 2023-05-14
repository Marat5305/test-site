import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Category } from './category.entity';

@Entity()
export class Good {

    /*
    id, марка, модель, категория, артикул, изображение, цена, количество, изготовитель
    */
    @PrimaryGeneratedColumn()
    id: number;

    // Марка
    @Column()
    mark: string;

    // Модель
    @Column()
    model: string;

    // Категория
    @ManyToOne(type => Category, category => category.name)
    category: Category;

    // Артикул
    @Column()
    article: string;

    // Цена
    @Column({ nullable: true })
    cost: string;

    // Количество
    @Column({ nullable: true })
    count: string;

    // Изготовитель
    @Column({ nullable: true })
    manufacturer: string;

    // Изображение
    @Column({ nullable: true })
    img: string;
}