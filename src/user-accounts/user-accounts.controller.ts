import {
  Controller,
  Patch,
  Param,
  Body,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { PermissionGuard } from 'src/permission.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserAccountsService } from './user-accounts.service';

@Controller('users')
export class UserAccountsController {
  constructor(private readonly userAccountsService: UserAccountsService) {}

  @UseGuards(JwtAuthGuard, new PermissionGuard(['user', 'admin', 'employee']))
  @Post()
  linkUserwithAccount(@Body() createUserDto: CreateUserDto) {
    return this.userAccountsService.update(createUserDto);
  }
}
