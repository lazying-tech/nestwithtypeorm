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
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { PermissionGuard } from 'src/permission.guard';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @UseGuards(JwtAuthGuard, new PermissionGuard(['admin']))
  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['admin']))
  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['admin']))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['admin']))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(+id, updatePermissionDto);
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['admin']))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }
}
