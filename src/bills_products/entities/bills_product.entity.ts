import { Bill } from 'src/bills/entities/bill.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('bills_products')
export class BillProducts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => Bill, (bill) => bill.billProducts)
  @JoinColumn()
  bill: Bill;

  @ManyToOne(() => Product, (product) => product.billProducts)
  @JoinColumn()
  product: Product;
}
