import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userInfo } from 'os';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}

    create(createUserDto: CreateUserDto): Promise<Users> {
        const user = new Users();
        user.username = createUserDto.username;
        user.password = createUserDto.password;
        user.email = createUserDto.email;
        user.isactive = createUserDto.isactive;

        return this.usersRepository.save(user);
    }

    async findall(): Promise<Users[]> {
        return this.usersRepository.find();
    }



    findOne(id: number): Promise<Users> {
        return this.usersRepository.findOneBy({ id });
    }

    findBy(username: string): Promise<Users> {
        return this.usersRepository.findOneBy({username});
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }


}