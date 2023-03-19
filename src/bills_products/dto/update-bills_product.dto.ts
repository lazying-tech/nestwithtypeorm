import { PartialType } from '@nestjs/mapped-types';
import { CreateBillsProductDto } from './create-bills_product.dto';

export class UpdateBillsProductDto extends PartialType(CreateBillsProductDto) {}
