import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Order from './Order';

@Entity('methods_payments')
class MethodPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Order, order => order.method_payment_id)
  @JoinColumn({ name: 'order_id' })
  orders: Order[];

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default MethodPayment;
