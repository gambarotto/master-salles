import UserAddress from '@modules/users/infra/typeorm/entities/UserAddress';
import IUserAdressesRepository from '@modules/users/repositories/IUserAdressesRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  userId: string;
  street: string;
  number: string;
  district: string;
  city: string;
  zipCode: string;
  complement: string;
  referencePoint: string;
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
    userId,
    street,
    number,
    district,
    city,
    zipCode,
    complement,
    referencePoint,
    alias,
  }: IRequest): Promise<UserAddress> {
    const userExists = await this.usersRepository.findById({ userId });

    if (!userExists) {
      throw new AppError('User non-exists');
    }
    const userAddress = await this.userAdressesRepository.create({
      street,
      user: userExists,
      number,
      district,
      city,
      zipCode,
      complement,
      referencePoint,
      alias,
    });
    return userAddress;
  }
}
export default CreateUserService;
