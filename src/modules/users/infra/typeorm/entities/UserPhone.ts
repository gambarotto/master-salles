import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';

@Entity('user_phones')
class UserPhone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.phones)
  @JoinColumn({ name: 'user_id' })
  user_id: string;

  @Column({ type: 'text' })
  phone_number: string;

  @Column({ type: 'boolean' })
  default: boolean;
}
export default UserPhone;
