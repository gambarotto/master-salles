import ICreateUserPhoneDTO from '@modules/users/dtos/ICreateUserPhoneDTO';
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
}
export default FakeUserPhoneRepository;
