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

@Entity('storeAdresses')
class StoreAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Store, store => store.address)
  @JoinColumn({ name: 'storeId' })
  store: Store;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  zipCode: string;

  @Column({ nullable: true })
  complement: string;

  @Column({ nullable: true })
  referencePoint: string;

  @Column({ nullable: true, type: 'float8' })
  lat: number;

  @Column({ nullable: true, type: 'float8' })
  long: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
export default StoreAddress;
