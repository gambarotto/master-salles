import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import StoreAddress from './StoreAddress';

@Entity('stores')
class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  cnpj: string;

  @Column({ nullable: true })
  image_logo: string;

  @OneToOne(() => StoreAddress, storeAddress => storeAddress.store_id)
  address: StoreAddress;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'logo_url' })
  getLogo(): string | null {
    return this.image_logo
      ? `${process.env.APP_API_URL}/files/stores/${this.image_logo}`
      : null;
  }
}
export default Store;
