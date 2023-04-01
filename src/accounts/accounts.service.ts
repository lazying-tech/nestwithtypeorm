import {
  Body,
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { MSG } from 'src/message';
import { UserService } from 'src/user/user.service';

import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private userService: UserService,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const salt = await genSalt(10);
    const passwordHashed = await hash(createAccountDto.password, salt);

    const newAccount = this.accountRepository.create({
      username: createAccountDto.username,
      password: passwordHashed,
      email: createAccountDto.email,
      permission: { id: 1 },
      enable: 1,
    });
    return await this.accountRepository.save(newAccount);
  }

  findAll() {
    return `This action returns all accounts`;
  }

  async findByUsername(username: string) {
    return await this.accountRepository.findOne({
      where: { username: username },
      relations: ['permission'],
    });
  }

  async findOne(id: number) {
    return await this.accountRepository.findOne({
      where: { id: id },
      relations: ['permission'],
    });
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const account = await this.accountRepository.findOne({ where: { id: id } });

    if (!account) {
      return MSG(
        'Acount not found to update',
        null,
        null,
        HttpStatus.NOT_FOUND,
      );
    }

    if (updateAccountDto.userId) {
      const userFound = await this.userService.findOne(updateAccountDto.userId);

      if (userFound.data === null) {
        return MSG(
          'User not found to update account',
          userFound.data,
          null,
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
    }
    const updateAccount = Object.assign(account, {
      email: updateAccountDto.email,
      permission: { id: updateAccountDto.permission },
      user: { id: updateAccountDto.userId },
      enable: updateAccountDto.enable,
    });
    const save = await this.accountRepository.save(updateAccount);
    return MSG('Update completed', save, null, HttpStatus.OK);
  }

  async remove(id: number) {
    const account = await this.accountRepository.findOne({ where: { id: id } });
    if (!account) {
      return MSG(
        'Acount not found to delete',
        null,
        null,
        HttpStatus.NOT_FOUND,
      );
    }
    const updateAccount = Object.assign(account, {
      enable: 0,
    });

    const save = await this.accountRepository.save(updateAccount);
    return MSG('Remove completed', save, null, HttpStatus.OK);
  }
}
