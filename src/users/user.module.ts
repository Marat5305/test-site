import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { NunjucksModule } from 'nest-nunjucks';

@Module({
    imports: [
        NunjucksModule.forRoot({
            paths: [
              "./views",
            ],
            options: {},
          }),
        TypeOrmModule.forFeature([User])],
    providers: [UsersService],
    controllers: [UsersController],
})

export class UsersModule {}