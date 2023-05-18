import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GoodsService } from "./good.service";
import { GoodsController } from "./good.controller";
import { Good } from "./good.entity";
import { NunjucksModule } from "nest-nunjucks";

import { Category } from "./category.entity";
import { CategoryService } from "./category.service";

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
    controllers: [GoodsController],
})

export class GoodsModule {}