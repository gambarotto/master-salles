import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindByIdWithRelationsDTO from '@modules/users/dtos/IFindByIdWithRelationsDTO';
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
    const userResponse = await this.ormRepository.findOne(userUpdated.id, {
      relations: ['favorite_products', 'adresses'],
    });
    return userResponse as User;
  }

  public async delete(user_id: string): Promise<void> {
    await this.ormRepository.delete(user_id);
  }

  public async findById({
    user_id,
    relations = [],
  }: IFindByIdWithRelationsDTO): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(user_id, {
      relations,
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }
}

export default UsersRepository;
