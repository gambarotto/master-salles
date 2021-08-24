/* eslint-disable no-restricted-syntax */
import UserAddress from '@modules/users/infra/typeorm/entities/UserAddress';
import IUserAdressesRepository from '@modules/users/repositories/IUserAdressesRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  userAddress_id: string;
}

@injectable()
class SetUserAdressesAsDefaultService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserAdressesRepository')
    private userAdressesRepository: IUserAdressesRepository,
  ) {}

  public async execute({
    userAddress_id,
    user_id,
  }: IRequest): Promise<UserAddress | undefined> {
    const userExists = await this.usersRepository.findById({
      user_id,
    });

    if (!userExists) {
      throw new AppError('User non-exists');
    }
    const addressExists = await this.userAdressesRepository.findById(
      userAddress_id,
    );
    if (addressExists?.user_id !== userExists.id) {
      throw new AppError('You do not have privilegies to do this');
    }
    const adresses = await this.userAdressesRepository.findAllByUser(user_id);

    for await (const address of adresses as UserAddress[]) {
      Object.assign(address, { default: address.id === userAddress_id });
      await this.userAdressesRepository.update(address);
    }
    const addressUpdated = adresses.find(adrs => adrs.id === addressExists.id);

    return addressUpdated;
  }
}
export default SetUserAdressesAsDefaultService;
