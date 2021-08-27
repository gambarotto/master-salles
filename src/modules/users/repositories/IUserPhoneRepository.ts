import ICreateUserPhoneDTO from '../dtos/ICreateUserPhoneDTO';
import IFindByUserAndIdPhoneDTO from '../dtos/IFindByUserAndIdPhoneDTO';
import UserPhone from '../infra/typeorm/entities/UserPhone';

export default interface IUserPhoneRepository {
  create(data: ICreateUserPhoneDTO): Promise<UserPhone>;
  update(data: UserPhone): Promise<UserPhone>;
  findAllByUser(user_id: string): Promise<UserPhone[]>;
  findByUserAndId({
    user_id,
    phone_number_id,
  }: IFindByUserAndIdPhoneDTO): Promise<UserPhone | undefined>;
  updateDefault(data: UserPhone): Promise<void>;
  delete(data: IFindByUserAndIdPhoneDTO): Promise<void>;
}
