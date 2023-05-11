import { BillProducts } from 'src/bills_products/entities/bills_product.entity';
import { Brand } from 'src/brands/entities/brand.entity';

import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column({ type: 'varchar', length: 50 })
  unit: string;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn()
  brand: Brand;

  @Column()
  img: string;

  @Column()
  description: string;

  @Column({ type: 'int', width: 1 })
  enable: number;

  @OneToMany(() => BillProducts, (billproduct) => billproduct.product)
  billProducts: BillProducts[];
}
