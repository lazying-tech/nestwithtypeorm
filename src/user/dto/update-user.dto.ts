import { PartialType } from '@nestjs/mapped-types';

import { CreateUserDto } from './create-user.dto';

type Enable = 1 | 0;

export class UpdateUserDto extends PartialType(CreateUserDto) {
  enable?: Enable;
}
