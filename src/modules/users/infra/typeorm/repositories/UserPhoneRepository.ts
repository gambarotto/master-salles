import ICreateUserPhoneDTO from '@modules/users/dtos/ICreateUserPhoneDTO';
import IFindByUserAndIdPhoneDTO from '@modules/users/dtos/IFindByUserAndIdPhoneDTO';
import UserPhone from '@modules/users/infra/typeorm/entities/UserPhone';
import IUserPhoneRepository from '@modules/users/repositories/IUserPhoneRepository';
import { getRepository, Repository } from 'typeorm';

class UserPhoneRepository implements IUserPhoneRepository {
  private ormRepository: Repository<UserPhone>;

  constructor() {
    this.ormRepository = getRepository(UserPhone);
  }

  async create(data: ICreateUserPhoneDTO): Promise<UserPhone> {
    const userPhoneObject = this.ormRepository.create(data);
    const userPhone = await this.ormRepository.save(userPhoneObject);
    return userPhone;
  }

  async findAllByUser(user_id: string): Promise<UserPhone[]> {
    const userPhones = await this.ormRepository.find({ where: { user_id } });
    return userPhones;
  }

  async update(data: UserPhone): Promise<UserPhone> {
    const userPhone = await this.ormRepository.save(data);
    return userPhone;
  }

  async updateDefault(data: UserPhone): Promise<void> {
    await this.ormRepository.save(data);
  }

  async findByUserAndId({
    user_id,
    phone_number_id,
  }: IFindByUserAndIdPhoneDTO): Promise<UserPhone | undefined> {
    const userPhone = await this.ormRepository.findOne({
      where: { user_id, id: phone_number_id },
    });
    return userPhone;
  }

  async delete({
    user_id,
    phone_number_id,
  }: IFindByUserAndIdPhoneDTO): Promise<void> {
    await this.ormRepository.delete({ user_id, id: phone_number_id });
  }
}
export default UserPhoneRepository;
