import { Module } from '@nestjs/common';
import { BillsProductsService } from './bills_products.service';
import { BillsProductsController } from './bills_products.controller';

@Module({
  controllers: [BillsProductsController],
  providers: [BillsProductsService]
})
export class BillsProductsModule {}
