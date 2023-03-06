import { Module } from '@nestjs/common';
import { NunjucksModule } from 'nest-nunjucks';
import { AppController, DevController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    NunjucksModule.forRoot({
       paths: [
         "./views",
       ],
       options: {},
     }),
  ],
  controllers: [AppController, DevController],
  providers: [AppService],
})
export class AppModule {}
