import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    ParseIntPipe,
    Res,
    Redirect,
    UseInterceptors,
    UploadedFile,
    Delete,
    Req,
} from "@nestjs/common";

import { Good } from '../goods/good.entity';
import { GoodsService } from '../goods/good.service';
import { CreateGoodDto } from "../goods/dto/create-good.dto";

import { Response } from 'express';
import { Category } from "src/goods/category.entity";
import { CategoryService } from "src/goods/category.service";
import { CreateCategoryDto } from "src/goods/dto/create-category.dto";
import { InsertValuesMissingError } from "typeorm";
import { diskStorage } from "multer";
import { editFileName, imageFileFilter } from "src/utils/file-upload.utils";
import { FileInterceptor } from "@nestjs/platform-express";
import { identity } from "rxjs";

@Controller('admin')
export class AdminController {
    constructor(private readonly goodsService: GoodsService, 
    private readonly categoriesService: CategoryService) {}
// Promise<Object>
    @Get()
    async findAllItems(@Res() res: Response, @Req() req): Promise<void> {
        const categories = await this.categoriesService.findAll().then(result => result);
        const goods = await this.goodsService.findAll().then(result => result);
        let items = {
            "categories": categories,
            "goods": goods
        };
        if (req.user.role != 'admin') {
            res.redirect('/');
        }
        else {
            res.render("admin.html", {items})
        }
        // return items;
    }

}

@Controller('admin/categories')
export class AdminCategoryController {
    constructor(private readonly goodsService: GoodsService, 
        private readonly categoriesService: CategoryService) {}
    
    // Переход в редактор категорий
    @Get()
    async findAllCategories(@Res() res: Response): Promise<Category[]> {
        const categories = await this.categoriesService.findAll().then(result => result);
        res.render("adminCategory.html", {categories});
        return categories;
    }

    @Redirect('categories')
    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoriesService.create(createCategoryDto);
    }

     // Переход на страницу редактирования одного товара
     @Get('/:id')
     async findOneCategory(@Res() res: Response, @Param('id') id: number): Promise<Category> {
         const category = await this.categoriesService.findOne(id);
         res.render("adminCategoryItem.html", {category});
         return category;
     }    

     @Redirect('/admin/categories')
     @Post('/:id')
     async deleteOneCategory(@Param('id') id: string): Promise<void> {
         this.categoriesService.remove(id);
     }
}


@Controller('admin/goods') 
export class AdminGoodsController {
    constructor(private readonly goodsService: GoodsService, 
        private readonly categoriesService: CategoryService) {}

        // Переход в редактор товаров
    @Get()
    async findAllGoods(@Res() res: Response): Promise<Good[]> {
        const goods = await this.goodsService.findAll().then(result => result);
        res.render("adminGoods.html", {goods})
        return goods;
    }

    // Хранит в себе новое имя загружаемого изображения
    fileName: string = undefined;
    // Создание нового товара
    @Redirect('goods')
    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './assets/images/goods',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }), 
    )
    createGood(@Body() createGoodDto: CreateGoodDto, @UploadedFile() file): Promise<Good> {
        this.fileName = '/assets/images/goods/' + `${file.filename}`;
        createGoodDto.image = this.fileName;
        return this.goodsService.create(createGoodDto);
    }

    // Переход на страницу редактирования одного товара
    @Get('/:id')
    async findOneGood(@Res() res: Response, @Param('id') id: number): Promise<Good> {
        const good = await this.goodsService.findOne(id);
        res.render("adminGoodsItem.html", {good});
        return good;
    }    

    // Удалить запись
    @Redirect('/admin/goods')
    @Post('delete/:id')
    async deleteOneGood(@Param('id') id: string): Promise<void> {
        this.goodsService.remove(id);
    }

    // Изменить запись
    @Redirect('/admin/goods')
    @Post('update/:id')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './assets/images/goods',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }), 
    )
    async updateOneGood(@Param('id') id: string, @Body() createGoodDto: CreateGoodDto, @UploadedFile() file): Promise<void> {
        this.fileName = 'images/goods/' + `${file.filename}`;
        createGoodDto.image = this.fileName;
        this.goodsService.updateGood(id, createGoodDto);
    }
    // @Redirect('/admin/goods')
    // @Post('/delete/')
    // async deleteOneGood(@Body() body): Promise<void> {
    //     this.goodsService.remove(body.id);
    // }
    // @Redirect('/admin/goods')
    // @Delete(':id')
    // async deleteOneGood(@Param('id') id: string) {
    //     this.goodsService.remove(id);
    // }


}