import { Account } from 'src/accounts/entities/account.entity';
import { Bill } from 'src/bills/entities/bill.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 50 })
  firstName: string;
  @Column({ type: 'varchar', length: 50 })
  lastName: string;
  @Column()
  address: string;
  @Column({ type: 'int', width: 11 })
  phone: number;

  @OneToMany(() => Account, (account) => account.employee)
  accounts: Account[];

  @OneToMany(() => Bill, (bill) => bill.employee)
  bills: Bill[];
}
