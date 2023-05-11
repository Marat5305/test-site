import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFiltersDto } from './dto/create-filters.dto';
import { Filters } from './filters.entity';

@Injectable()
export class FiltersService {
    constructor(
        @InjectRepository(Filters)
        private filtersRepository: Repository<Filters>,
    ) {}
    
    create(CreateFiltersDto: CreateFiltersDto): Promise<Filters> {
        const filters = new Filters();
        filters.filterType = CreateFiltersDto.filterType;
        filters.filters = CreateFiltersDto.filters;

        return this.filtersRepository.save(filters);
    }

    async findAll(): Promise<Filters[]> {
        return this.filtersRepository.find();
    }

    findOne(id: number): Promise<Filters> {
        return this.filtersRepository.findOneBy({ id });
    }

    async remove(id: string): Promise<void> {
        await this.filtersRepository.delete(id);
    }
 }