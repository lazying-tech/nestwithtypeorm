import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';

import { MSG } from 'src/message';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
    private categoryService: CategoriesService,
  ) {}
  async create(createBrandDto: CreateBrandDto) {
    const categoryFound = await this.categoryService.findOne(
      createBrandDto.categoryId,
    );

    if (categoryFound.data === null) {
      return MSG(
        'Category not found to create brand',
        categoryFound.data,
        null,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const newBrand = this.brandRepository.create(createBrandDto);
    console.log(createBrandDto);
    const save = await this.brandRepository.save(newBrand);
    return MSG('Done!', save, null, HttpStatus.OK);
  }

  findAll() {
    return `This action returns all brands`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
