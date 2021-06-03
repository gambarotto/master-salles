import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindByIdWithRelationsDTO from '../dtos/IFindByIdWithRelationsDTO';
import IFindUserByIdDTO from '../dtos/IFindUserByIdDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  findById(user_id: IFindUserByIdDTO): Promise<User | undefined>;
  findByIdWithRelations({
    user_id,
    relations,
  }: IFindByIdWithRelationsDTO): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  update(user: User): Promise<User>;
  delete(user_id: string): Promise<void>;

  // addFavoriteProduct(user: User): Promise<User>;
}
