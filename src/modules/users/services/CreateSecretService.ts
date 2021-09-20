import IEncryptProvider from '@shared/container/providers/encryptProvider/models/IEncryptProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUserRepository';

interface IResponse {
  secret: string;
}
@injectable()
class CreateSecretService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('EncryptProvider')
    private encryptProvider: IEncryptProvider,
  ) {}

  public async execute(user_id: string): Promise<IResponse> {
    const user = await this.usersRepository.findById({ user_id });
    if (!user) {
      throw new AppError('Only authenticate users', 401);
    }

    const secretHash = this.encryptProvider.encrypt({
      data: process.env.APP_SECRET_CRYPTOJS_MOBILE || 'secret-mobile-jest',
      key: process.env.APP_SECRET_CRYPTOJS || 'secret-crypto-jest',
    });
    console.log('secretHash', secretHash);

    return { secret: secretHash };
  }
}
export default CreateSecretService;
