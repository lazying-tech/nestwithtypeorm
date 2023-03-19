import { BillProducts } from 'src/bills_products/entities/bills_product.entity';
import { Employee } from 'src/employees/entities/employee.entity';

import { User } from 'src/user/entities/user.entity';
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

  @ManyToOne(() => User, (user) => user.bills)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Employee, (employee) => employee.bills)
  @JoinColumn({ name: 'employeeId', referencedColumnName: 'id' })
  employee: Employee;

  @OneToMany(() => BillProducts, (billsproducts) => billsproducts.bill)
  billProducts: BillProducts[];
}
