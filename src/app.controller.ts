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
import { CreateGoodDto } from './goods/dto/create-good.dto';

// import { Request } from 'express';
import { Render } from '@nestjs/common';
import { Response } from 'express';

import { LoginGuard } from './guards/login.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AuthExceptionFilter } from './common/auth-exceptions.filter';


@Controller('')
@UseFilters(AuthExceptionFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get()
  index(@Res() res: Response, @Req() req): void {
    const headline: string = 'Nunjucks!';
    return res.render('index.html', {user: req.user});
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
  getLK(@Res() res, @Request() req) {
    res.render("lk.html", {user: req.user});
    return { user: req.user};
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

