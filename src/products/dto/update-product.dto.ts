import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

type Enable=1|0

export class UpdateProductDto extends PartialType(CreateProductDto) {
    enable?:Enable
}
