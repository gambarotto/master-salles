import User from '@modules/users/infra/typeorm/entities/User';
import UserAddress from '@modules/users/infra/typeorm/entities/UserAddress';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import MethodPayment from './MethodPayment';
import OrderStatus from './OrderStatus';

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

  // @ManyToMany(() => Status, status => status.orders)
  // @JoinTable({
  //   name: 'orders_status',
  //   joinColumn: { name: 'order_id' },
  //   inverseJoinColumn: { name: 'status_id' },
  // })
  // status: Status[];
  @OneToMany(() => OrderStatus, orderStatus => orderStatus.order_id)
  status: OrderStatus[];

  @ManyToOne(() => MethodPayment, methodPayment => methodPayment.orders)
  @JoinColumn({ name: 'method_payment_id' })
  payment_method_id: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
export default Order;