import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import OrderStatus from './OrderStatus';

@Entity('status')
class Status {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  // @ManyToMany(() => Order, order => order.status)
  // orders: Order[];
  @OneToMany(() => OrderStatus, orderStatus => orderStatus.status_id)
  orders: OrderStatus[];

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
export default Status;

// - um pedido pode ter diversas instancias de status
// - um status pode estar em diversas instancias de pedido
