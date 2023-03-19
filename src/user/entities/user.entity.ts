import { Account } from 'src/accounts/entities/account.entity';
import { Bill } from 'src/bills/entities/bill.entity';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'varchar', length: 50 })
  address: string;

  @Column({ type: 'int', width: 11 })
  phone: number;
  // @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  // createAt: Date;

  @Column({ type: 'int', width: 1 })
  enable: number;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @OneToMany(() => Bill, (bill) => bill.user)
  bills: Bill[];
}
