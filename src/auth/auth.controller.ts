import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';

import { AuthService } from './auth.service';

import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createAccountDto: CreateAccountDto) {
    return await this.authService.register(createAccountDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
}
