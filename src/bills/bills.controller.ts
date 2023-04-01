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
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @UseGuards(JwtAuthGuard, new PermissionGuard(['employee', 'admin']))
  @Post()
  create(@Body() createBillDto: CreateBillDto) {
    return this.billsService.create(createBillDto);
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['admin', 'employee']))
  @Get()
  findAll() {
    return this.billsService.findAll();
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['admin', 'employee']))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['admin', 'employee']))
  @Patch(':id')
  verify(@Param('id') id: string) {
    return this.billsService.verify(+id);
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['admin', 'employee']))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billsService.remove(+id);
  }
}
