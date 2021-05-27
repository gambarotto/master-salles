import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('stores_adresses')
class StoreAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column()
  // store_id: string;

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

  @Column({ nullable: true })
  lat: number;

  @Column({ nullable: true })
  long: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default StoreAddress;
