import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    ParseIntPipe,
    Res,
    Redirect,
    Req,
} from "@nestjs/common";

import { Good } from './good.entity';
import { GoodsService } from './good.service';
import { CreateGoodDto } from "./dto/create-good.dto";

import { Response } from 'express';
import { CategoryService } from "./category.service";
import { UsersService } from "src/users/users.service";

@Controller('catalog')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService,
    private readonly categoryService: CategoryService,
    private readonly usersService: UsersService) {}

    model = require('../model/model');

    @Get()
    async findAllItems(@Res() res: Response, @Req() req): Promise<Object> {
        const categories = await this.categoryService.findAll().then(result => result);
        const goods = await this.goodsService.findAll().then(result => result);;
        var username = this.usersService.findBy("darth");
        const recommends = await this.model.recommend(req.user.id);
        console.log(username);
        let items = {
            "categories": categories,
            "goods": goods,
            "recommends": recommends,
        }
        res.render("catalog.html", {items});
        return items;
    }

    // @Get('/:id')
    // async getGood(@Res() res: Response, @Param('id') id: number): Promise<Good> {
    //     const good = await this.goodsService.findOne(id);
    //     res.render("catalogItem.html", {good})
    //     return good;
    // }

    // @Redirect('catalog')
    // @Post()
    // create(@Body() createGoodDto: CreateGoodDto): Promise<Good> {
        
    //     return this.goodsService.create(createGoodDto);
    // }
}

@Controller('catalog/:id')
export class GoodIdController {
    constructor(private readonly goodsService: GoodsService, 
                private readonly categoryService: CategoryService) {}
    
    model = require('../model/model');
    @Get()
    async getGood(@Res() res: Response, @Param('id') id: number): Promise<Object> {
        const good = await this.goodsService.findOne(id);
        const goods = await this.goodsService.findAll();
        const recommends = await this.model.recommend(100);
        let items = {
            'good': good,
            'goods': goods,
            'recommends': recommends
        }

        res.render("catalogItem.html", {items})
        return good;
    }
}