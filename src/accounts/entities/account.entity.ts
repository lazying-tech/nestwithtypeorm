
import { Bill } from 'src/bills/entities/bill.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 25, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 25 })
  password: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({ type: 'int', width: 1 })
  enable: number;

  @ManyToOne(() => User, (user) => user.accounts)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => Bill, (bill) => bill.user)
  bills: Bill[];
  
  @OneToOne(() => Permission)
  @JoinColumn()
  permission: number;
}
