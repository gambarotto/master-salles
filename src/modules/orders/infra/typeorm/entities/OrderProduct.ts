import Product from '@modules/products/infra/typeorm/entities/Product';
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Order from './Order';

@Entity('orders_products')
class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'float' })
  price: number;

  @ManyToOne(() => Order, order => order.order_product)
  @JoinColumn({ name: 'order_id' })
  order_id: string;

  @ManyToOne(() => Product, product => product.product_order, { eager: true })
  @JoinColumn({ name: 'product_id' })
  @Expose({ name: 'product' })
  product_id: string;
}
export default OrderProduct;
