import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  password?: string;
}

@injectable()
class DeleteUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ user_id, password }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found');
    }
    if (!password) {
      throw new AppError('Inform your password');
    }
    const matchedPassword = await this.hashProvider.compareHash(
      password,
      user.password,
    );
    if (!matchedPassword) {
      throw new AppError('Password do not match');
    }
    await this.usersRepository.delete(user_id);
  }
}
export default DeleteUserProfileService;
