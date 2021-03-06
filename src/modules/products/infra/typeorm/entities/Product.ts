import Category from '@modules/categories/infra/typeorm/entities/Category';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  cost_price: number;

  @Column()
  sale_price: number;

  // @ManyToMany(() => Category, category => category.products)
  // @JoinTable()
  // categories: Category[];

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
export default Product;
