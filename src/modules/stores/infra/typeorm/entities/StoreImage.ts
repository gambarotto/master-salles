import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Store from './Store';

@Entity('stores_images')
class StoreImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  path: string;

  @ManyToOne(() => Store, store => store.photos)
  @JoinColumn({ name: 'store_id' })
  store_id: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @Expose({ name: 'image_url' })
  getLogo(): string | null {
    return this.path
      ? `${process.env.APP_API_URL}/files/stores/${this.path}`
      : null;
  }
}
export default StoreImage;
