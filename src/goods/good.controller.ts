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

@Controller('catalog')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Get()
    async findAll(@Res() res: Response): Promise<Good[]> {
        const goods = await this.goodsService.findAll().then(result => result);
        res.render('catalog.html', { goods })
        return goods;
    }

    @Redirect('catalog')
    @Post()
    create(@Body() createGoodDto: CreateGoodDto): Promise<Good> {
        
        return this.goodsService.create(createGoodDto);
    }
}