import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Good {
    // id, марка, модель, категория, артикул, изображение, цена, количество, изготовитель
    @PrimaryGeneratedColumn()
    id: number;
    // Марка
    @Column()
    mark: string;
    // Модель
    @Column()
    model: string;
    // Категория
    @Column({nullable: true})
    category: string;
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
    image: string;
    raitings: any;
    cart: any;
}