import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '../../../../users/infra/typeorm/entities/User';

@Entity('payment_cards')
class UserPaymentCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.payment_cards)
  @JoinColumn({ name: 'user_id' })
  user_id: string;

  @Column({ name: 'card_id' })
  card_id: string;
}
export default UserPaymentCard;
