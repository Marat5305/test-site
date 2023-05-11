import { Body, 
        Controller, 
        Get, 
        Req, 
        Post, 
        Res,
        Redirect } from '@nestjs/common';
import { AppService } from './app.service';

import { Good } from './goods/good.entity';
import { GoodsService } from './goods/good.service';
import { CreateGoodDto } from './goods/dto/create-good.dto';

import { Request } from 'express';
import { Render } from '@nestjs/common';
import { Response } from 'express';


@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get()
  index(@Res() res: Response): void {
    const headline: string = 'Nunjucks!';
    return res.render('index.html')
  }

  // @Get()
  // @Render('index')
}


@Controller('dev')
export class DevController {
  @Get('params')
  getParams(@Req() req: Request) {
    return req.url;
  }
}
