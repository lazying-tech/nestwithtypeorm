import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BillsService } from 'src/bills/bills.service';
import { MSG } from 'src/message';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { CreateBillsProductDto } from './dto/create-bills_product.dto';
import { UpdateBillsProductDto } from './dto/update-bills_product.dto';
import { BillProducts } from './entities/bills_product.entity';

@Injectable()
export class BillsProductsService {
  constructor(
    private billService: BillsService,
    private productService: ProductsService,
    @InjectRepository(BillProducts)
    private billProductsRepository: Repository<BillProducts>,
  ) {}

  async create(billId: number, createBillsProductDto: CreateBillsProductDto) {
    const billFound = await this.billService.findOne(billId);
    if (!billFound) {
      return MSG(
        'Bill not found to create',
        null,
        null,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const productFound = await this.productService.findOne(
      createBillsProductDto.productId,
    );
    if (productFound.data == null) {
      return MSG(
        'Product not found to create',
        null,
        null,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const newBillProducts = this.billProductsRepository.create({
      bill: { id: billId },
      product: { id: createBillsProductDto.productId },
      quantity: createBillsProductDto.quantity,
      price: createBillsProductDto.price,
    });

    return await this.billProductsRepository.save(newBillProducts);
  }

  async findAll() {
    const products = await this.billProductsRepository.find();
    return MSG('Done!', products, null, HttpStatus.OK);
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
