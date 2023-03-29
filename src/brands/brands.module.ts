import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [CategoriesModule, TypeOrmModule.forFeature([Brand])],
  controllers: [BrandsController],
  providers: [BrandsService],
  exports:[BrandsService]
})
export class BrandsModule {}
