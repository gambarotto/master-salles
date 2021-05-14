import User from '@modules/users/infra/typeorm/entities/User';
import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  name?: string;
  email?: string;
  old_password?: string;
  new_password?: string;
}

@injectable()
class UpdateUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    new_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found');
    }
    if (email && email !== user.email) {
      const alreadyExistsEmail = await this.usersRepository.findByEmail(email);
      if (alreadyExistsEmail) {
        throw new AppError('Email already exists');
      }
    }
    if (old_password) {
      const matchedPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );
      if (!matchedPassword) {
        throw new AppError('Password do not match');
      }
      if (!new_password) {
        throw new AppError('New Password is missing');
      }
      const passwordHashed = await this.hashProvider.generateHash(new_password);
      user.password = passwordHashed;
    }
    Object.assign(user, { name, email });
    const updatedUser = await this.usersRepository.update(user);
    return updatedUser;
  }
}
export default UpdateUserProfileService;
