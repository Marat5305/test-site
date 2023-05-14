import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryService } from "src/goods/category.service";
import { GoodsService } from "src/goods/good.service";
import { GoodsController } from "src/goods/good.controller";
import { Category } from "src/goods/category.entity";
import { Good } from "src/goods/good.entity";

import { NunjucksModule } from "nest-nunjucks";
import { AdminController } from "./admin.controller";

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
        controllers: [AdminController],
    
})
export class AdminModule {}
