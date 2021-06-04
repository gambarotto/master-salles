import User from '@modules/users/infra/typeorm/entities/User';
import UserAddress from '@modules/users/infra/typeorm/entities/UserAddress';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import MethodPayment from './MethodPayment';
import Status from './Status';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean' })
  delivery: boolean;

  @Column({ type: 'varchar', nullable: true })
  transaction_id: string;

  @Column({ type: 'float' })
  total: string;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'user_id' })
  user_id: string;

  @ManyToOne(() => UserAddress)
  @JoinColumn({ name: 'billing_address_id' })
  billing_address_id: string;

  @ManyToOne(() => UserAddress)
  @JoinColumn({ name: 'shipping_address_id' })
  shipping_address_id: string;

  @ManyToMany(() => Status, status => status.orders)
  @JoinTable({
    name: 'orders_status',
    joinColumn: { name: 'order_id' },
    inverseJoinColumn: { name: 'status_id' },
  })
  status: Status[];

  @ManyToOne(() => MethodPayment, methodPayment => methodPayment.orders)
  @JoinColumn({ name: 'method_payment_id' })
  method_payment_id: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
export default Order;
