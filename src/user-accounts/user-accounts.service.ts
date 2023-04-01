import { Inject, Injectable, Scope } from '@nestjs/common';

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { AccountsService } from 'src/accounts/accounts.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable({ scope: Scope.REQUEST })
export class UserAccountsService {
  constructor(
    private accountService: AccountsService,
    @Inject(REQUEST) private readonly request: Request,
    private userService: UserService,
  ) {}

  async update(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    const userId = Object.values(this.request.user)[0];
    const updateAccount = await this.accountService.update(userId, {
      userId: user.id,
    });

    return updateAccount;
  }
}
