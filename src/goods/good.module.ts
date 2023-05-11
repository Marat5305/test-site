import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GoodsService } from "./good.service";
import { GoodsController } from "./good.controller";
import { Good } from "./good.entity";
import { NunjucksModule } from "nest-nunjucks";

@Module({
    imports: [
        NunjucksModule.forRoot({
            paths: [
              "./views",
            ],
            options: {},
          }),
        TypeOrmModule.forFeature([Good])],
    providers: [GoodsService],
    controllers: [GoodsController],
})

export class GoodsModule {}