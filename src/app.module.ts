import { Module } from '@nestjs/common';

import { NunjucksModule } from 'nest-nunjucks';

import { AppController, DevController } from './app.controller';
import { AppService } from './app.service';
import { GoodsService } from './goods/good.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { Users } from './users/user.entity';
import { UsersModule } from './users/user.module';
import { UsersController } from './users/users.controller';

import { Good } from './goods/good.entity';
import { GoodsModule } from './goods/good.module';
// import { GoodsController } from './goods/good.controller';

import { Filters } from './filters/filters.entity';
import { FiltersModule } from './filters/filters.module';
import { FiltersController } from './filters/filters.controller'; 

import { AdminModule } from './admin/admin.module';

import { MulterModule } from '@nestjs/platform-express';
import { FilesModule } from './files/files.module';
import { join } from 'path';


@Module({
  imports: [
     NunjucksModule.forRoot({
       paths: [
       ],
       options: {},
     }),
     TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5555,
      username: 'postgres',
      password: 'root',
      database: 'mydb',
      autoLoadEntities: true,
      synchronize: true,
     }),
     MulterModule.register({
      dest: './assets/images/goods',
     }),
     UsersModule, GoodsModule, FiltersModule, AdminModule, FilesModule,
  ],
  controllers: [AppController, DevController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
