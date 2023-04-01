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
import { BillsProductsService } from './bills_products.service';
import { CreateBillsProductDto } from './dto/create-bills_product.dto';
import { UpdateBillsProductDto } from './dto/update-bills_product.dto';

@Controller('bills-products')
export class BillsProductsController {
  constructor(private readonly billsProductsService: BillsProductsService) {}

  @UseGuards(JwtAuthGuard, new PermissionGuard(['admin', 'employee']))
  @Post(':billId')
  create(
    @Param('billId') billid: number,
    @Body() createBillsProductDto: CreateBillsProductDto,
  ) {
    return this.billsProductsService.create(billid, createBillsProductDto);
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['admin', 'employee']))
  @Get()
  findAll() {
    return this.billsProductsService.findAll();
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['admin', 'employee']))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billsProductsService.findOne(+id);
  }
}
