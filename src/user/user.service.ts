import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSG } from 'src/message';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const newuser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newuser);
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      return MSG('User not found', null, null, HttpStatus.NOT_FOUND);
    }
    return MSG('Done!', user, null, HttpStatus.OK);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      return MSG('User not found to update', null, null, HttpStatus.NOT_FOUND);
    }
    const updateUser = Object.assign(user, updateUserDto);
    const save = await this.userRepository.save(updateUser);
    return MSG('Update completed', save, null, HttpStatus.OK);
  }

  async remove(id: number) {
    const result = await this.userRepository.delete({ id });
    if (result.affected === 0) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return MSG('Remove completed', result, null, HttpStatus.OK);
  }
}
