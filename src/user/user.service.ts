import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    // const userFound = await this.userRepository.findOne({
    //   where: { email: createUserDto.email },
    // });
    // if (userFound) {
    //   return new HttpException('User already exists', HttpStatus.CONFLICT);
    // }
    // const newUser = await this.userRepository.create(createUserDto);
    // return await this.userRepository.save(newUser);
  }

  async findAll() {
    const users = await this.userRepository.find({
      relations: ['posts', 'profile'],
    });
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['posts'],
    });

    if (!user) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      return new HttpException(
        'User not found to update',
        HttpStatus.NOT_FOUND,
      );
    }
    const updateUser = Object.assign(user, updateUserDto);
    return this.userRepository.save(updateUser);
  }

  async remove(id: number) {
    const result = await this.userRepository.delete({ id });
    if (result.affected === 0) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async createProfile(id: number, profileDto: CreateProfileDto) {
    const userFound = await this.userRepository.findOne({ where: { id: id } });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // const newProfile = await this.profileRepository.create(profileDto);

    // const savedProfile = await this.profileRepository.save(newProfile);

    // userFound.profile = savedProfile;
    return this.userRepository.save(userFound);
  }
}
