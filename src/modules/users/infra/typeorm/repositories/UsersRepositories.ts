import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindUserByIdDTO from '@modules/users/dtos/IFindUserByIdDTO';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);
    await this.ormRepository.save(user);
    return user;
  }

  public async update(user: User): Promise<User> {
    const userUpdated = await this.ormRepository.save(user);
    return userUpdated;
  }

  public async delete(user_id: string): Promise<void> {
    await this.ormRepository.delete(user_id);
  }

  public async findById({
    user_id,
    address = false,
  }: IFindUserByIdDTO): Promise<User | undefined> {
    let user;
    if (address) {
      user = await this.ormRepository.findOne(user_id, {
        relations: ['adresses'],
      });
    } else {
      user = await this.ormRepository.findOne(user_id);
    }
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }
}

export default UsersRepository;
