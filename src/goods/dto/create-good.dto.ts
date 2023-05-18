import { Category } from '../category.entity';

export class CreateGoodDto {
    mark: string;
    model: string;
    // category: string;
    // category: Category;
    category: string;
    article: string;
    cost: string;
    count: string;
    manufacturer: string;
    image: string;
}