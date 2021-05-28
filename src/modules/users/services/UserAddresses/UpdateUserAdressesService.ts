import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import UserAddress from '../../infra/typeorm/entities/UserAddress';
import IUserAdressesRepository from '../../repositories/IUserAdressesRepository';
import IUsersRepository from '../../repositories/IUserRepository';

interface IRequest {
  userId: string;
  id: string;
  street?: string;
  number?: string;
  district?: string;
  city?: string;
  zipCode?: string;
  complement?: string;
  referencePoint?: string;
  alias?: string;
}

@injectable()
class UpdateUserAdressesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserAdressesRepository')
    private userAdressesRepository: IUserAdressesRepository,
  ) {}

  public async execute(data: IRequest): Promise<UserAddress> {
    const userExists = await this.usersRepository.findById({
      userId: data.userId,
    });
    if (!userExists) {
      throw new AppError('User non-exists');
    }
    const userAddress = await this.userAdressesRepository.findById(data.id);

    if (!userAddress || undefined) {
      throw new AppError('Address not found');
    }

    if (userAddress.user.id !== userExists.id) {
      throw new AppError('You can edit only yours adresses');
    }
    Object.assign(userAddress, data);
    const userAddressUpdated = await this.userAdressesRepository.update(
      userAddress,
    );
    return userAddressUpdated;
  }
}
export default UpdateUserAdressesService;
