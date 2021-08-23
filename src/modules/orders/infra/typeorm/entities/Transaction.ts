import User from '@modules/users/infra/typeorm/entities/User';
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
  acquirer_id: string;

  @Column()
  acquirer_name: string;

  @Column()
  acquirer_response_code: string;

  @Column()
  transaction_amount: number;

  @Column()
  status: string;

  @Column({ nullable: true, type: 'character varying' })
  refuse_reason: string | null;

  @Column()
  status_reason: string;

  @Column({ nullable: true, type: 'character varying' })
  authorization_code: string | null;

  @Column()
  tid: number;

  @Column()
  payment_method: string;

  @Column()
  card_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
export default Transaction;
