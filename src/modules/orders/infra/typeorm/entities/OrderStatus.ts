import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import Order from './Order';
import Status from './Status';

@Entity('orders_status')
class OrderStatus {
  @PrimaryColumn()
  @ManyToOne(() => Order, order => order.status)
  @JoinColumn({ name: 'order_id' })
  order_id: string;

  @PrimaryColumn()
  @ManyToOne(() => Status, status => status.orders)
  @JoinColumn({ name: 'status_id' })
  status_id: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
export default OrderStatus;
