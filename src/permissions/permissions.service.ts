import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSG } from 'src/message';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}
  async create(createPermissionDto: CreatePermissionDto) {
    const newPermission = this.permissionRepository.create(createPermissionDto);
    return await this.permissionRepository.save(newPermission);
  }

  async findAll() {
    return await this.permissionRepository.find();
  }

  async findOne(id: number) {
    const permission = await this.permissionRepository.findOne({
      where: { id: id },
    });

    if (!permission) {
      return MSG('Category not found', null, null, HttpStatus.NOT_FOUND);
    }
    return MSG('Done!', permission, null, HttpStatus.OK);
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const permissionFound = await this.permissionRepository.findOne({
      where: { id: id },
    });

    if (!permissionFound) {
      return MSG(
        'Permission not found to update',
        null,
        null,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedpermission = await this.permissionRepository.update(
      { id },
      {
        name: updatePermissionDto.name,
      },
    );
    return MSG('Update completed', updatedpermission, null, HttpStatus.OK);
  }

  async remove(id: number) {
    const categoryFound = await this.permissionRepository.findOne({
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
    const removedcategory = await this.permissionRepository.delete({ id });
    return MSG('Remove completed', removedcategory, null, HttpStatus.OK);
  }
}
