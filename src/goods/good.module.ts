import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GoodsService } from "./good.service";
import { GoodsController, GoodIdController } from "./good.controller";
import { Good } from "./good.entity";
import { NunjucksModule } from "nest-nunjucks";

import { Category } from "./category.entity";
import { CategoryService } from "./category.service";
import { Users } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";

// import { ModelClass } from "src/model/model";

@Module({
    imports: [
        NunjucksModule.forRoot({
            paths: [
              // "./public",
              // "./assets/*/*",
            ],
            options: {},
          }),
        TypeOrmModule.forFeature([Good, Category, Users])],
    providers: [GoodsService, CategoryService, UsersService],
    controllers: [GoodsController, GoodIdController],
})

export class GoodsModule {}