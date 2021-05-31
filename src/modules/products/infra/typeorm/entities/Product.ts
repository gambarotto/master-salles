import CategoryProduct from '@modules/categories/infra/typeorm/entities/CategoryProduct';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
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

  @OneToMany(
    () => CategoryProduct,
    categoryProduct => categoryProduct.product_id,
  )
  @JoinColumn({ name: 'categories_products' })
  categories_products: CategoryProduct[];

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
export default Product;
