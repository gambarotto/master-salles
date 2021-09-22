import IUsersRepository from '@modules/users/repositories/IUserRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import { addHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  request_user_id: string;
  verification_code: number;
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

  public async execute({
    request_user_id,
    verification_code,
    password,
  }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByCode(
      verification_code,
    );
    if (!userToken) {
      throw new AppError('User token does not exists');
    }
    const user = await this.usersRepository.findById({
      user_id: userToken.user_id,
    });
    if (!user) {
      throw new AppError('User dos not exists');
    }
    if (user.id !== request_user_id) {
      throw new AppError('invalid id');
    }
    const createdAt = userToken.created_at;
    const createdAtWithTwoHours = addHours(createdAt, 2);
    if (isAfter(Date.now(), createdAtWithTwoHours)) {
      throw new AppError('Code expired');
    }
    user.password = await this.hashProvider.generateHash(password);
    await this.usersRepository.update(user);
  }
}
export default ResetUserPasswordService;
