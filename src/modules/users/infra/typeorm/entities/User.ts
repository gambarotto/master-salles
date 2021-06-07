import Order from '@modules/orders/infra/typeorm/entities/Order';
import Product from '@modules/products/infra/typeorm/entities/Product';
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import UserAddress from './UserAddress';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  avatar?: string;

  @OneToMany(() => UserAddress, userAddress => userAddress.user_id)
  adresses: UserAddress[];

  @ManyToMany(() => Product, product => product.favorite_users)
  @JoinTable({
    name: 'favorities_users_products',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'product_id' },
  })
  favorite_products: Product[];

  @OneToMany(() => Order, order => order.user_id)
  orders: Order[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    return this.avatar
      ? `${process.env.APP_API_URL}/files/users/${this.avatar}`
      : null;
  }
}
export default User;
