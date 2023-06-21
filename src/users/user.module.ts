import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './user.entity';
import { NunjucksModule } from 'nest-nunjucks';

@Module({
    imports: [
        NunjucksModule.forRoot({
            paths: [
              "./views",
            ],
            options: {},
          }),
        TypeOrmModule.forFeature([Users])],
    providers: [UsersService],
    controllers: [UsersController],
})

export class UsersModule {}