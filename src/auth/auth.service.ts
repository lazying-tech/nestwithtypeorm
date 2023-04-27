import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcrypt';
import { AccountsService } from 'src/accounts/accounts.service';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';
import { Account } from 'src/accounts/entities/account.entity';
import { MSG } from 'src/message';

@Injectable()
export class AuthService {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const account = await this.accountsService.findByUsername(username);

    if (!account) {
      return MSG(
        "Can't find account with that username",
        null,
        null,
        HttpStatus.NOT_FOUND,
      );
    }

    const passwordMatches = await compare(password, account.password);

    if (passwordMatches) {
      return account;
    } else {
      return null;
    }
  }

  async register(createAccountDto: CreateAccountDto) {
    const account = await this.accountsService.create(createAccountDto);
    return account;
  }

  async login(account: Account) {
    const payload = {
      username: account.username,
      sub: account.id,
      permission: account.permission.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
