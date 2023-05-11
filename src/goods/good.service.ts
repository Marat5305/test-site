import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGoodDto } from './dto/create-good.dto';
import { Good } from './good.entity';

@Injectable()
export class GoodsService {
    constructor(
        @InjectRepository(Good)
        private goodsRepository: Repository<Good>,
    ) {}

    create(createGoodDto: CreateGoodDto): Promise<Good> {
        const good = new Good();
        good.mark = createGoodDto.mark;
        good.model = createGoodDto.model;
        good.category = createGoodDto.category;
        good.article = createGoodDto.article;
        good.cost = createGoodDto.cost;
        good.count = createGoodDto.count;
        good.manufacturer = createGoodDto.manufacturer;
        good.img = createGoodDto.img;
        

        return this.goodsRepository.save(good);
    }


    async findAll(): Promise<Good[]> {
        return this.goodsRepository.find();
    }

    findOne(id: number): Promise<Good> {
        return this.goodsRepository.findOneBy({ id });
    }

    async remove(id: string): Promise<void> {
        await this.goodsRepository.delete(id);
    }


}