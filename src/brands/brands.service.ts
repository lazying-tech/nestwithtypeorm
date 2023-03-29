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

    const newBrand = this.brandRepository.create({
      name: createBrandDto.name,
      category: { id: createBrandDto.categoryId },
    });

    const save = await this.brandRepository.save(newBrand);
    return MSG('Done!', save, null, HttpStatus.OK);
  }

  async findAll() {
    return await this.brandRepository.find({
      relations: ['category'],
    });
  }

  async findOne(id: number) {
    const brandFound = await this.brandRepository.findOne({
      where: { id: id },
      relations: ['category'],
    });
    if (!brandFound) {
      return MSG('Brand not found to update', null, null, HttpStatus.NOT_FOUND);
    }
    return MSG('Done!', brandFound, null, HttpStatus.OK);
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const brandFound = await this.brandRepository.findOne({
      where: { id: id },
    });

    if (!brandFound) {
      return MSG('Brand not found to update', null, null, HttpStatus.NOT_FOUND);
    }

    const updatedBrand = await this.brandRepository.update(
      { id },
      {
        name: updateBrandDto.name,
        category: { id: updateBrandDto.categoryId },
      },
    );
    return MSG('Update completed', updatedBrand, null, HttpStatus.OK);
  }

  async remove(id: number) {
    const brandFound = await this.brandRepository.findOne({
      where: { id: id },
    });

    if (!brandFound) {
      return MSG('Brand not found to remove', null, null, HttpStatus.NOT_FOUND);
    }
    const removedBrand = await this.brandRepository.delete({ id });
    return MSG('Remove completed', removedBrand, null, HttpStatus.OK);
  }
}
