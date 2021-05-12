import { v4 } from 'uuid';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUserRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: v4() }, data);

    this.users.push(user);
    return user;
  }

  public async update(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;
    return user;
  }

  public async findById(user_id: string): Promise<User | undefined> {
    const user = this.users.find(u => u.id === user_id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(u => u.email === email);
    return user;
  }
}

export default FakeUsersRepository;
