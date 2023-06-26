import { Body, 
        Controller, 
        Get, 
        Req, 
        Post, 
        Res,
        Redirect,
        UseGuards, 
        Request,
        UseFilters,
        Next} from '@nestjs/common';
import { AppService } from './app.service';

import { Good } from './goods/good.entity';
import { GoodsService } from './goods/good.service';
import { CategoryService } from './goods/category.service';
import { CreateGoodDto } from './goods/dto/create-good.dto';

// import { Request } from 'express';
import { Render } from '@nestjs/common';
import { Response } from 'express';

import { LoginGuard } from './guards/login.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AuthExceptionFilter } from './common/auth-exceptions.filter';
import { threadId } from 'worker_threads';


@Controller('')
@UseFilters(AuthExceptionFilter)
export class AppController {
  constructor(private readonly appService: AppService,
              private goodsService: GoodsService,
              private readonly categoryService: CategoryService) {}

  model = require('./model/model');
  @Get()
  async index(@Res() res: Response, @Req() req): Promise<void> {

    var recommends: any;
      const categories = await this.categoryService.findAll().then(result => result);
      const goods = await this.goodsService.findAll().then(result => result);;
      // var username = this.usersService.findBy("darth");
      var recommends: any;
      if (req.user != null) {
            recommends = await this.model.recommend(req.user.id);
      }
      // console.log(username);
      var items: Object; 
      if (req.user != null) {
        items = {
          "categories": categories,
          "goods": goods,
          "recommends": recommends,
          "user": req.user,
        }
      }
      else {
        items = {
          "categories": categories,
          "goods": goods,
        }
      }
    return res.render('index.html', {items} );
  }

  @Get('/login')
  renderLogin(@Request() req, @Res() res: Response): { message: string } {
    res.render('login.html');
    return { message: req.flash('loginError') };
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  login(@Res() res: Response): void {
    return res.redirect("/");
  }


  @UseGuards(AuthenticatedGuard)
  @Get('/lk')
  getLK(@Res() res, @Request() req): void {
    var items = {
      "user": req.user,
    }
    res.render("lk.html", {items});
  }

  @Get('/logout')
  logout(@Res() res: Response, @Req() req, @Next() next): void {
    req.logout(function(err) {
      if (err) {
        return next(err);
      }
    res.redirect('/');
    });
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

