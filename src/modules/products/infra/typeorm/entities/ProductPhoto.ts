import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Product from './Product';

@Entity('products_photos')
class ProductPhoto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  path: string;

  @ManyToOne(() => Product, product => product.photos)
  @JoinColumn({ name: 'product_id' })
  product_id: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @Expose({ name: 'photo_url' })
  getLogo(): string | null {
    return this.path
      ? `${process.env.APP_API_URL}/files/products/${this.path}`
      : null;
  }
}
export default ProductPhoto;
