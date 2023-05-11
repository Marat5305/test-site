import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiltersService } from './filters.service';
import { FiltersController } from './filters.controller';
import { Filters } from './filters.entity';
import { NunjucksModule } from 'nest-nunjucks';

@Module({
    imports: [
        NunjucksModule.forRoot({
            paths: [
                "./views",
            ],
            options: {},
        }),
        TypeOrmModule.forFeature([Filters])],
    providers: [FiltersService],
    controllers: [FiltersController],

})

export class FiltersModule {}