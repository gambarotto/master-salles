import IUserAdressesRepository from '@modules/users/repositories/IUserAdressesRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  address_id: string;
}

@injectable()
class DeleteUserAdressesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserAdressesRepository')
    private userAdressesRepository: IUserAdressesRepository,
  ) {}

  public async execute({ user_id, address_id }: IRequest): Promise<void> {
    const userExists = await this.usersRepository.findById(user_id);
    if (!userExists) {
      throw new AppError('User non-exists');
    }
    const userAddress = await this.userAdressesRepository.findById(address_id);
    if (!userAddress) {
      throw new AppError('Address not found');
    }
    if (userAddress.user_id !== userExists.id) {
      throw new AppError('You can delete only yours adresses');
    }
    await this.userAdressesRepository.delete(userAddress);
  }
}
export default DeleteUserAdressesService;
