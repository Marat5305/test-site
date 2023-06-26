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
import { any } from "@tensorflow/tfjs-node";
import { throws } from "assert";

@Controller('catalog')
export class GoodsController {
    constructor(private readonly goodsService: GoodsService,
        private readonly categoryService: CategoryService,
        private readonly usersService: UsersService) { }

    model = require('../model/model');

    @Get()
    async findAllItems(@Res() res: Response, @Req() req): Promise<Object> {
        const categories = await this.categoryService.findAll().then(result => result);
        const goods = await this.goodsService.findAll().then(result => result);;
        // var username = this.usersService.findBy("darth");
        var recommends: any;
        var items: Object;
        if (req.user != null) {
            recommends = await this.model.recommend(req.user.id);
            items = {
                "categories": categories,
                "goods": goods,
                "recommends": recommends,
                "user": req.user,
            }
        }
        else {
            items = {
                "categories": categories,
                "goods": goods,
            }
        }

        res.render("catalog.html", { items });
        return items;
    }
}

@Controller('catalog/:id')
export class GoodIdController {
    constructor(private readonly goodsService: GoodsService,
        private readonly categoryService: CategoryService) { }

    model = require('../model/model');
    @Get()
    async getGood(@Res() res: Response, @Param('id') id: number, @Req() req): Promise<Object> {
        const good = await this.goodsService.findOne(id);
        const goods = await this.goodsService.findAll();
        var recommends = await this.model.recommend(100);
        // const popular = await (await this.goodsService.findAll()).filter();
        var items: any;
        if (req.user != null) {
            recommends = await this.model.recommend(req.user.id);
            items = {
                'good': good,
                'goods': goods,
                'recommends': recommends,
                "user": req.user,
            }
        }
        else {
            items = {
                'good': good,
                'goods': goods,
            }
        }

        res.render("catalogItem.html", { items })
        return good;
    }
}