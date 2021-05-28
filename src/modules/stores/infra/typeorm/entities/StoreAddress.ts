import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Store from './Store';

@Entity('store_adresses')
class StoreAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Store, store => store.address)
  @JoinColumn({ name: 'store_id' })
  @Expose({ name: 'store' })
  store_id: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  zip_code: string;

  @Column({ nullable: true })
  complement: string;

  @Column({ nullable: true })
  reference_point: string;

  @Column({ nullable: true, type: 'float8' })
  lat: number;

  @Column({ nullable: true, type: 'float8' })
  long: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default StoreAddress;
