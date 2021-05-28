import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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
  imageLogo: string;

  @OneToMany(() => StoreAddress, storeAddress => storeAddress.store)
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Expose({ name: 'logoUrl' })
  getLogo(): string | null {
    return this.imageLogo
      ? `${process.env.APP_API_URL}/files/${this.imageLogo}`
      : null;
  }
}
export default Store;
