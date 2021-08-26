import ICreateUserPhoneDTO from '../dtos/ICreateUserPhoneDTO';
import UserPhone from '../infra/typeorm/entities/UserPhone';

export default interface IUserPhoneRepository {
  create(data: ICreateUserPhoneDTO): Promise<UserPhone>;
  findAllByUser(user_id: string): Promise<UserPhone[]>;
  updateDefault(data: UserPhone): Promise<void>;
}
