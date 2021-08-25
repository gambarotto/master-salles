import User from '@modules/users/infra/typeorm/entities/User';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Exclude()
  acquirer_id: string;

  @Column()
  @Exclude()
  acquirer_name: string;

  @Column()
  @Exclude()
  acquirer_response_code: string;

  @Column()
  @Exclude()
  transaction_amount: number;

  @Column()
  status: string;

  @Column({ nullable: true, type: 'character varying' })
  @Exclude()
  refuse_reason: string | null;

  @Column()
  @Exclude()
  status_reason: string;

  @Column({ nullable: true, type: 'character varying' })
  @Exclude()
  authorization_code: string | null;

  @Column()
  @Exclude()
  tid: number;

  @Column()
  payment_method: string;

  @Column()
  card_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @CreateDateColumn()
  @Exclude()
  updated_at: Date;
}
export default Transaction;
