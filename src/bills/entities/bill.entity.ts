import { Account } from 'src/accounts/entities/account.entity';
import { BillProducts } from 'src/bills_products/entities/bills_product.entity';



import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('bills')
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column({ type: 'varchar', length: 20 })
  status: string;

  @Column()
  totalPrice: number;

  @ManyToOne(() => Account, (account) => account.bills)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user:Account ;

  @ManyToOne(() => Account, (account) => account.bills)
  @JoinColumn({ name: 'employeeId', referencedColumnName: 'id' })
  employee: Account;

  @OneToMany(() => BillProducts, (billsproducts) => billsproducts.bill)
  billProducts: BillProducts[];
}
