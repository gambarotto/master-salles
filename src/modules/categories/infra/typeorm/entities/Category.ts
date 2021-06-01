import Product from '@modules/products/infra/typeorm/entities/Product';
import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @ManyToMany(() => Product, product => product.category_id)
  @Expose({ name: 'products' })
  product_id: Product[];

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @Expose({ name: 'image_url' })
  getImageUrl(): string | null {
    return this.image ? `${process.env.APP_API_URL}/files/${this.image}` : null;
  }
}
export default Category;
