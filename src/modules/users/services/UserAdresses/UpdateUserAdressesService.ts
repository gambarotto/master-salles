import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import UserAddress from '../../infra/typeorm/entities/UserAddress';
import IUserAdressesRepository from '../../repositories/IUserAdressesRepository';
import IUsersRepository from '../../repositories/IUserRepository';

interface IRequest {
  user_id: string;
  id: string;
  street?: string;
  number?: string;
  district?: string;
  city?: string;
  zip_code?: string;
  complement?: string;
  reference_point?: string;
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
      user_id: data.user_id,
    });
    if (!userExists) {
      throw new AppError('User non-exists');
    }

    const userAddress = await this.userAdressesRepository.findById(data.id);

    if (!userAddress || undefined) {
      throw new AppError('Address not found');
    }
    if (userAddress.user_id !== userExists.id) {
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
