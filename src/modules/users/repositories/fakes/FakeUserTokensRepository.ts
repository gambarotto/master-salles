import { v4 } from 'uuid';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '../IUserTokensRepository';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[];

  constructor() {
    this.userTokens = [];
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, {
      id: v4(),
      token: Math.floor(Math.random() * 899999 + 100000),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);
    return userToken;
  }

  public async findByCode(code: number): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(u => u.verification_code === code);
    return userToken;
  }

  public async findByUser(user_id: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(u => u.user_id === user_id);
    return userToken;
  }

  public async delete(userToken_id: string): Promise<void> {
    const index = this.userTokens.findIndex(u => u.id === userToken_id);
    this.userTokens.splice(index, 1);
  }
}

export default FakeUserTokensRepository;
