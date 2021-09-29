import IUsersRepository from '@modules/users/repositories/IUserRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  verification_code: number;
}

@injectable()
class VerifyCodeResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ verification_code }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByCode(
      verification_code,
    );
    if (!userToken) {
      throw new AppError('Invalid code');
    }
    const user = await this.usersRepository.findById({
      user_id: userToken.user_id,
    });
    if (!user) {
      throw new AppError('User dos not exists');
    }
  }
}
export default VerifyCodeResetPasswordService;
