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
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @UseGuards(JwtAuthGuard, new PermissionGuard(['admin']))
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['admin']))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(+id, updateBrandDto);
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['admin']))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandsService.remove(+id);
  }
}
