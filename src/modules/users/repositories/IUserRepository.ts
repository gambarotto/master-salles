import ICreateUserDTO from '../dtos/ICreateUserDTO';
// import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  // findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findById(user_id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  update(user: User): Promise<User>;
}
