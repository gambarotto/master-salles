import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindByIdWithRelationsDTO from '../dtos/IFindByIdWithRelationsDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  findById({
    user_id,
    relations,
  }: IFindByIdWithRelationsDTO): Promise<User | undefined>;
  // findByIdWithRelations(: IFindByIdWithRelationsDTO): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  update(user: User): Promise<User | undefined>;
  delete(user_id: string): Promise<void>;

  // addFavoriteProduct(user: User): Promise<User>;
}
