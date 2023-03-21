import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BillsProductsService } from './bills_products.service';
import { CreateBillsProductDto } from './dto/create-bills_product.dto';
import { UpdateBillsProductDto } from './dto/update-bills_product.dto';

@Controller('bills-products')
export class BillsProductsController {
  constructor(private readonly billsProductsService: BillsProductsService) {}

  @Post()
  create(@Body() createBillsProductDto: CreateBillsProductDto) {
    return this.billsProductsService.create(createBillsProductDto);
  }

  @Get()
  findAll() {
    return this.billsProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billsProductsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBillsProductDto: UpdateBillsProductDto,
  ) {
    return this.billsProductsService.update(+id, updateBillsProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billsProductsService.remove(+id);
  }
}
