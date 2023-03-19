import { Injectable } from '@nestjs/common';
import { CreateBillsProductDto } from './dto/create-bills_product.dto';
import { UpdateBillsProductDto } from './dto/update-bills_product.dto';

@Injectable()
export class BillsProductsService {
  create(createBillsProductDto: CreateBillsProductDto) {
    return 'This action adds a new billsProduct';
  }

  findAll() {
    return `This action returns all billsProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} billsProduct`;
  }

  update(id: number, updateBillsProductDto: UpdateBillsProductDto) {
    return `This action updates a #${id} billsProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} billsProduct`;
  }
}
