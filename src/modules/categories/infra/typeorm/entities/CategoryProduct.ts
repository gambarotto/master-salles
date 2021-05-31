import Product from '@modules/products/infra/typeorm/entities/Product';
import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';
import Category from './Category';

@Entity('categories_products')
class CategoryProduct {
  @PrimaryColumn()
  @ManyToOne(() => Category, category => category.products_categories, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'category_id' })
  category_id: number;

  @PrimaryColumn()
  @ManyToOne(() => Product, product => product.categories_products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'product_id' })
  product_id: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
export default CategoryProduct;
