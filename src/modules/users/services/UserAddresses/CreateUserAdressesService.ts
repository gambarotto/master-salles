import UserAddress from '@modules/users/infra/typeorm/entities/UserAddress';
import IUserAdressesRepository from '@modules/users/repositories/IUserAdressesRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
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

  public async execute({
    user_id,
    street,
    number,
    district,
    city,
    zip_code,
    complement,
    reference_point,
    alias,
  }: IRequest): Promise<UserAddress> {
    const userExists = await this.usersRepository.findById({ user_id });

    if (!userExists) {
      throw new AppError('User non-exists');
    }
    const userAddress = await this.userAdressesRepository.create({
      user_id,
      street,
      number,
      district,
      city,
      zip_code,
      complement,
      reference_point,
      alias,
    });
    return userAddress;
  }
}
export default CreateUserService;
