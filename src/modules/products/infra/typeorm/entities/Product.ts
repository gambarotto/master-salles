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

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({ type: 'float' })
  cost_price: number;

  @Column({ type: 'float' })
  sale_price: number;

  @ManyToMany(() => Category, category => category.product_id)
  @JoinTable({
    name: 'categories_products',
    joinColumn: { name: 'product_id' },
    inverseJoinColumn: { name: 'category_id' },
  })
  category_id: Category[];

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
export default Product;
