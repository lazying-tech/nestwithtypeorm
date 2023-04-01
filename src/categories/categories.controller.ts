import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

import { PermissionGuard } from 'src/permission.guard';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard, new PermissionGuard(['admin']))
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    // console.log(req.user);
    return this.categoriesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoriesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['admin']))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['admin']))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
