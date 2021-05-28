import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindUserByIdDTO from '../dtos/IFindUserByIdDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  // findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findById(userId: IFindUserByIdDTO): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  update(user: User): Promise<User>;
  delete(userId: string): Promise<void>;
}
