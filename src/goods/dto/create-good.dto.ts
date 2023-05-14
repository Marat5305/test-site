import { Category } from '../category.entity';

export class CreateGoodDto {
    mark: string;
    model: string;
    // category: string;
    category: Category;
    article: string;
    cost: string;
    count: string;
    manufacturer: string;
    img: string;
}