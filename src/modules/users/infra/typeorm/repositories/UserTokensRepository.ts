import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { getRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userTokenCreated = this.ormRepository.create({
      user_id,
      verification_code: Math.floor(Math.random() * 899999 + 100000),
    });
    const userToken = await this.ormRepository.save(userTokenCreated);
    return userToken;
  }

  public async findByCode(code: number): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { verification_code: code },
      loadRelationIds: true,
    });
    return userToken;
  }

  public async findByUser(user_id: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { user_id },
    });
    return userToken;
  }

  public async delete(userToken_id: string): Promise<void> {
    await this.ormRepository.delete(userToken_id);
  }
}
export default UserTokensRepository;
