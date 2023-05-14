import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ) {}

    create(CreateCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = new Category();
        category.name = CreateCategoryDto.name;

        return this.categoriesRepository.save(category);
    }

    async findAll(): Promise<Category[]> {
        return this.categoriesRepository.find();
    }

    findOne(id: number): Promise<Category> {
        return this.categoriesRepository.findOneBy({ id });
    }

    async remove(id: string): Promise<void> {
        await this.categoriesRepository.delete(id);
    }
}