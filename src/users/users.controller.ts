import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    ParseIntPipe,
    Res,
    Redirect,
} from '@nestjs/common';
import { Response } from 'express';
import { get } from 'http';

import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './user.entity';
import { UsersService } from './users.service';

@Controller('lk')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    

    // @Get()
    // findAll(): Promise<User[]> {
    //     return this.usersService.findall();
    // }

    // @Get('s')
    // usersRender(@Res() res: Response): void {
    //     // let users = [];

    //     // users.push(this.usersService.findall);

    //     return res.render('users.html');
    // }
    // @Get()
    // async findAll2(@Res() res: Response): Promise<User[]> {
    //     // let arr = this.usersService.findall().then();
    //     // arr2: User[] = this.usersService.findall();
    //     const users = await this.usersService.findall().then(result => result);
    //     res.render('users.html', { users });
    //     return users;
    // }
    @Get()
    returnPage(@Res() res: Response): void {
        res.render('lk.html');
    }
    @Redirect()
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<Users> {
        return this.usersService.create(createUserDto);
    }
    






    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Users> {
        return this.usersService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(id);
    }
}

