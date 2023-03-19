import { Brand } from 'src/brands/entities/brand.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @OneToMany(() => Brand, (brand) => brand.category)
  brands: Brand[];
}
