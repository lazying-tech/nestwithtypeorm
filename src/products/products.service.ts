import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandsService } from 'src/brands/brands.service';
import { MSG } from 'src/message';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private brandService: BrandsService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const brandFound = await this.brandService.findOne(
      createProductDto.brandId,
    );

    if (brandFound.data === null) {
      return MSG(
        'Brand not found to create Product',
        brandFound.data,
        null,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const newProduct = this.productRepository.create({
      name: createProductDto.name,
      quantity: createProductDto.quantity,
      price: createProductDto.price,
      brand: { id: createProductDto.brandId },
      img: createProductDto.img,
      description: createProductDto.description,
      unit: createProductDto.unit,
      enable: 1,
    });
    return await this.productRepository.save(newProduct);
  }

  async findAll() {
    const products = await this.productRepository.find();
    return MSG('Done!', products, null, HttpStatus.OK);
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where: { id: id } });

    if (!product) {
      return MSG('No product to find', null, null, HttpStatus.NOT_FOUND);
    }

    return MSG('Done!', product, null, HttpStatus.OK);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id: id } });
    if (!product) {
      return MSG(
        'Acount not found to update',
        null,
        null,
        HttpStatus.NOT_FOUND,
      );
    }

    if (updateProductDto.brandId) {
      const brandFound = await this.brandService.findOne(
        updateProductDto.brandId,
      );

      if (brandFound.data === null) {
        return MSG(
          'Brand not found to update account',
          brandFound.data,
          null,
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
    }
    const updateProduct = Object.assign(product, {
      name: updateProductDto.name,
      price: updateProductDto.price,
      quantity: updateProductDto.quantity,
      img: updateProductDto.img,
      description: updateProductDto.description,
      brand: { id: updateProductDto.brandId },
      unit: updateProductDto.unit,

      enable: updateProductDto.enable,
    });
    const save = await this.productRepository.save(updateProduct);
    return MSG('Update completed', save, null, HttpStatus.OK);
  }
}
