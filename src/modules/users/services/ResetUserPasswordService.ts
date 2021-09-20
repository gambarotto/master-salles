import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import { addHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

injectable();
class ResetUserPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('User token does not exists');
    }
    const user = await this.usersRepository.findById({
      user_id: userToken.user_id,
    });
    if (!user) {
      throw new AppError('User dos not exists');
    }
    const createdAt = userToken.created_at;
    const createdAtWithTwoHours = addHours(createdAt, 2);
    if (isAfter(new Date(), createdAtWithTwoHours)) {
      throw new AppError('Token expired');
    }
    user.password = await this.hashProvider.generateHash(password);
    await this.usersRepository.update(user);
  }
}
export default ResetUserPasswordService;
