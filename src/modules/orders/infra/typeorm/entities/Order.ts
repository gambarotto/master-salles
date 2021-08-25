import User from '@modules/users/infra/typeorm/entities/User';
import UserAddress from '@modules/users/infra/typeorm/entities/UserAddress';
import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import OrderProduct from './OrderProduct';
import Status from './Status';
import Transaction from './Transaction';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'user_id' })
  user_id: string;

  @OneToOne(() => Transaction)
  @JoinColumn({ name: 'transaction_id' })
  @Expose({ name: 'transaction' })
  transaction_id: string;

  @Column({ type: 'float' })
  amount: number;

  @ManyToMany(() => Status, status => status.orders)
  @JoinTable({
    name: 'orders_status',
    joinColumn: { name: 'order_id' },
    inverseJoinColumn: { name: 'status_id' },
  })
  status: Status[];

  @Column({ type: 'boolean' })
  delivery: boolean;

  @Column({ type: 'float' })
  delivery_fee: number;

  @ManyToOne(() => UserAddress)
  @JoinColumn({ name: 'billing_address_id' })
  billing_address_id: string;

  @ManyToOne(() => UserAddress)
  @JoinColumn({ name: 'shipping_address_id' })
  shipping_address_id: string;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.order_id)
  order_product: OrderProduct[];

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
export default Order;
