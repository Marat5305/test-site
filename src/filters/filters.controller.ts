import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    ParseIntPipe,
    Res,
    Redirect,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateFiltersDto } from './dto/create-filters.dto';
import { Filters } from './filters.entity';
import { FiltersService } from './filters.service';

@Controller('catalog')
export class FiltersController {
    constructor(private readonly filtersService: FiltersService) {}

    @Get()
    async findAll(@Res() res: Response): Promise<Filters[]> {
        const filters = await this.filtersService.findAll().then(result => result);
        const manufacturers = filters[0].filters.split(",");
        return filters;
    }
}