import ICreateUserPhoneDTO from '@modules/users/dtos/ICreateUserPhoneDTO';
import IFindByUserAndIdPhoneDTO from '@modules/users/dtos/IFindByUserAndIdPhoneDTO';
import UserPhone from '@modules/users/infra/typeorm/entities/UserPhone';
import { v4 } from 'uuid';
import IUserPhoneRepository from '../IUserPhoneRepository';

class FakeUserPhoneRepository implements IUserPhoneRepository {
  private userPhones: UserPhone[];

  constructor() {
    this.userPhones = [];
  }

  async create(data: ICreateUserPhoneDTO): Promise<UserPhone> {
    const userPhoneObject = new UserPhone();
    Object.assign(userPhoneObject, { id: v4(), ...data });
    this.userPhones.push(userPhoneObject);
    return userPhoneObject;
  }

  async findAllByUser(user_id: string): Promise<UserPhone[]> {
    return this.userPhones.filter(userPhone => userPhone.user_id === user_id);
  }

  async update(data: UserPhone): Promise<UserPhone> {
    const findIndex = this.userPhones.findIndex(
      userPhone => userPhone.id === data.id,
    );
    this.userPhones[findIndex] = data;
    return data;
  }

  async updateDefault(data: UserPhone): Promise<void> {
    const findIndex = this.userPhones.findIndex(
      userPhone => userPhone.id === data.id,
    );
    this.userPhones[findIndex] = data;
  }

  async findByUserAndId({
    user_id,
    phone_number_id,
  }: IFindByUserAndIdPhoneDTO): Promise<UserPhone | undefined> {
    const userPhone = this.userPhones.find(
      uPhone => uPhone.id === phone_number_id && uPhone.user_id === user_id,
    );
    return userPhone;
  }
}
export default FakeUserPhoneRepository;
