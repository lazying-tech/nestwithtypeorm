import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';

type Enable = 1 | 0;
type Permission = 1 | 2 | 3;

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
  enable?: Enable;
  permission?: Permission;
  userId?: number;
}
