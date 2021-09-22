import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export default interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>;
  findByCode(code: number): Promise<UserToken | undefined>;
  findByUser(user_id: string): Promise<UserToken | undefined>;
  delete(userToken_id: string): Promise<void>;
}
