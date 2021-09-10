import AppError from '@shared/errors/AppError';
import CryptoJS from 'crypto-js';
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
  ) {}

  public async execute(user_id: string): Promise<IResponse> {
    const user = await this.usersRepository.findById({ user_id });
    if (!user) {
      throw new AppError('Only authenticate users', 401);
    }

    const secretHash = CryptoJS.AES.encrypt(
      process.env.APP_SECRET_CRYPTOJS_MOBILE as string,
      process.env.APP_SECRET_CRYPTOJS as string,
    ).toString();

    return { secret: secretHash };
  }
}
export default CreateSecretService;
