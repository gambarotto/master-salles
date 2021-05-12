import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users_adresses')
class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  zip_code: string;

  @Column()
  complement: string;

  @Column()
  reference_point: string;

  @Column()
  alias: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @Expose({ name: 'avatar_url' })
  // getAvatarUrl(): string | null {
  //   return this.avatar
  //     ? `${process.env.APP_API_URL}/files/${this.avatar}`
  //     : null;
  // }
}
export default UserAddress;
