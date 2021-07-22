/* eslint-disable no-restricted-syntax */
import UserAddress from '@modules/users/infra/typeorm/entities/UserAddress';
import IUserAdressesRepository from '@modules/users/repositories/IUserAdressesRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
}

@injectable()
class GetUserAdressesDefaultService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserAdressesRepository')
    private userAdressesRepository: IUserAdressesRepository,
  ) {}

  public async execute({
    user_id,
  }: IRequest): Promise<UserAddress | undefined> {
    const userExists = await this.usersRepository.findById({
      user_id,
    });
    if (!userExists) {
      throw new AppError('User non-exists');
    }
    const defaultUserAddress =
      await this.userAdressesRepository.findDefaultUserAddress(user_id);

    return defaultUserAddress;
  }
}
export default GetUserAdressesDefaultService;
