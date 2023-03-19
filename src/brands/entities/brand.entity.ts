import { Category } from 'src/categories/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ManyToOne(() => Category, (category) => category.brands)
  @JoinColumn({ name: 'categoryId', referencedColumnName: 'id' })
  category: Category;
}
