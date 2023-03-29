import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { MSG } from 'src/message';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(newCategory);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
    });

    if (!category) {
      return MSG('Category not found', null, null, HttpStatus.NOT_FOUND);
    }
    return MSG('Done!', category, null, HttpStatus.OK);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categoryFound = await this.categoryRepository.findOne({
      where: { id: id },
    });

    if (!categoryFound) {
      return MSG(
        'Category not found to update',
        null,
        null,
        HttpStatus.NOT_FOUND,
      );
    }

    const updateCategory = Object.assign(categoryFound, updateCategoryDto);
    const save = await this.categoryRepository.save(updateCategory);

    return MSG('Update completed', save, null, HttpStatus.OK);
  }

  async remove(id: number) {
    const categoryFound = await this.categoryRepository.findOne({
      where: { id: id },
    });

    if (!categoryFound) {
      return MSG(
        'Category not found to remove',
        null,
        null,
        HttpStatus.NOT_FOUND,
      );
    }
    const removedcategory = await this.categoryRepository.delete({ id });
    return MSG('Remove completed', removedcategory, null, HttpStatus.OK);
  }
}
