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

import { Good } from '../goods/good.entity';
import { GoodsService } from '../goods/good.service';
import { CreateGoodDto } from "../goods/dto/create-good.dto";

import { Response } from 'express';
import { Category } from "src/goods/category.entity";
import { CategoryService } from "src/goods/category.service";
import { CreateCategoryDto } from "src/goods/dto/create-category.dto";

@Controller('admin')
export class AdminController {
    constructor(private readonly goodsService: GoodsService, 
    private readonly categoriesService: CategoryService) {}
    
    
    @Get()
    async findAllCategories(@Res() res: Response): Promise<Category[]> {
        const categories = await this.categoriesService.findAll().then(result => result);
        res.render("admin.html", {categories});
        return categories;
    }
    @Get()
    async findAllGoods(@Res() res: Response): Promise<Good[]> {
        const goods = await this.goodsService.findAll().then(result => result);
        res.render("admin.html", {goods})
        return goods;
    }

   

    @Redirect('admin')
    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoriesService.create(createCategoryDto);
    }

    @Redirect('admin')
    @Post()
    create2(@Body() createGoodDto: CreateGoodDto): Promise<Good> {
        return this.goodsService.create(createGoodDto);
    }
}