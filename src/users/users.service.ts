import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        user.email = createUserDto.email;
        user.isActive = createUserDto.isActive;

        return this.usersRepository.save(user);
    }

    // async findall(): Promise<User[]> {
    //     return this.usersRepository.find();
    // }
    async findall(): Promise<User[]> {
        return this.usersRepository.find();
    }



    findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id });
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }


}