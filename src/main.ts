import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as nunjucks from 'nunjucks';
import * as path from 'path';

const ROOT_DIR: string = join(__dirname, '..');
const IS_PRODUCTION: boolean = process.env.NODE_ENV === 'production';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const express = app.getHttpAdapter().getInstance();

  // Include Nunjucks
  //const opts: nunjucks.ConfigureOptions = { express: app, autoescape: true, watch: !IS_PRODUCTION, noCache: !IS_PRODUCTION };

  // const assets = path.join(__dirname, '..', 'assets');
  // const views = path.join(__dirname, '..', 'views');
  nunjucks.configure(path.join(__dirname, '..', 'views'), { express });
  
  app.enableCors();

  app.useStaticAssets(path.join(__dirname, '..', 'assets'), {prefix: '/assets'});
  // app.useStaticAssets(path.join(__dirname, 'assets', 'css'));
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
  app.setViewEngine('njk');
  // app.set('trust proxy', 1);
  // app.set('view engine', 'njk');


  await app.listen(3000);
}
bootstrap();
