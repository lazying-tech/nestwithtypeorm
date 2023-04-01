import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { PermissionGuard } from 'src/permission.guard';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('register')
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['admin', 'employee']))
  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['admin', 'employee']))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['admin']))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['admin']))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }
}
