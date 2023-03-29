import { Module } from '@nestjs/common';
import { BillsProductsService } from './bills_products.service';
import { BillsProductsController } from './bills_products.controller';
import { BillsModule } from 'src/bills/bills.module';
import { ProductsModule } from 'src/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillProducts } from './entities/bills_product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BillProducts]),BillsModule,ProductsModule],
  controllers: [BillsProductsController],
  providers: [BillsProductsService],
  exports:[BillsProductsService]
})
export class BillsProductsModule {}
