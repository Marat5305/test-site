import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryService } from "src/goods/category.service";
import { GoodsService } from "src/goods/good.service";
import { GoodsController } from "src/goods/good.controller";
import { Category } from "src/goods/category.entity";
import { Good } from "src/goods/good.entity";

import { NunjucksModule } from "nest-nunjucks";
import { AdminCategoryController, AdminController, AdminGoodsController } from "./admin.controller";
// import { FilesModule } from '../files/files.module';

@Module({
    imports: [
        NunjucksModule.forRoot({
            paths: [
                "./views",
            ],
            options: {},
        }),
        TypeOrmModule.forFeature([Good, Category])],
        providers: [GoodsService, CategoryService],
        controllers: [AdminController, AdminGoodsController, AdminCategoryController],
    
})
export class AdminModule {}
