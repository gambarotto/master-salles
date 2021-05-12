import UserAddress from '@modules/users/infra/typeorm/entities/UserAddress';
import IUserAdressesRepository from '@modules/users/repositories/IUserAdressesRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  street: string;
  number: string;
  district: string;
  city: string;
  zip_code: string;
  complement: string;
  reference_point: string;
  alias: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserAdressesRepository')
    private userAdressesRepository: IUserAdressesRepository,
  ) {}

  public async execute(data: IRequest): Promise<UserAddress> {
    const userExists = await this.usersRepository.findById(data.user_id);

    if (!userExists) {
      throw new Error('User non-exists');
    }
    const userAddress = await this.userAdressesRepository.create(data);
    return userAddress;
  }
}
export default CreateUserService;
