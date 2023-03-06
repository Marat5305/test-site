import { Controller, Get, Req, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { Render } from '@nestjs/common';
import { Response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get()
  index(@Res() res: Response): void {
    const headline: string = 'Nunjucks!';
    return res.render('index.html')
  }

  // @Get()
  // @Render('index')


  @Get('catalog')
  test(@Res() res: Response): void {
    return res.render('catalog.html');
  }
}

@Controller('dev')
export class DevController {
  //constructor(private readonly appService: AppService) {}

  @Get()
  getDev(): string {
    return 'in Dev!';
  }

  @Get('hello')
  getHello(): string {
    return 'Hello!';
  }

  @Get('params')
  getParams(@Req() req: Request) {
    return req.url;
  }
}
