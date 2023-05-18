import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    ParseIntPipe,
    Res,
    Redirect,
} from "@nestjs/common";

import { Good } from './good.entity';
import { GoodsService } from './good.service';
import { CreateGoodDto } from "./dto/create-good.dto";

import { Response } from 'express';
import { CategoryService } from "./category.service";

@Controller('catalog')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService,
    private readonly categoryService: CategoryService) {}

//   @Get()
//     async findAll(@Res() res: Response): Promise<Good[]> {
//         const goods = await this.goodsService.findAll().then(result => result);
//         res.render('catalog.html', { goods })
//         return goods;
//     }
    @Get()
    async findAllItems(@Res() res: Response): Promise<Object> {
        const categories = await this.categoryService.findAll().then(result => result);
        const goods = await this.goodsService.findAll().then(result => result);
        let items = {
            "categories": categories,
            "goods": goods
        }
        res.render("catalog.html", {items});
        return items;
    }

    @Get('/:id')
    async getGood(@Res() res: Response, @Param('id') id: number): Promise<Good> {
        const good = await this.goodsService.findOne(id);
        res.render("catalogItem.html", {good})
        return good;
    }

    // @Redirect('catalog')
    // @Post()
    // create(@Body() createGoodDto: CreateGoodDto): Promise<Good> {
        
    //     return this.goodsService.create(createGoodDto);
    // }
}