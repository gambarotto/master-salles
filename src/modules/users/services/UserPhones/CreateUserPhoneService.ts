import UserPhone from '@modules/users/infra/typeorm/entities/UserPhone';
import IUserPhoneRepository from '@modules/users/repositories/IUserPhoneRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  phone_number: string;
  isDefault: boolean;
}

@injectable()
class CreateUserPhoneService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserPhoneRepository')
    private userPhoneRepository: IUserPhoneRepository,
  ) {}

  async execute({
    user_id,
    phone_number,
    isDefault,
  }: IRequest): Promise<UserPhone> {
    const user = await this.usersRepository.findById({ user_id });
    if (!user) {
      throw new AppError('User not found');
    }
    if (phone_number.length < 10 || phone_number.length > 11) {
      throw new AppError('Phone number invalid');
    }
    let isFirst = false;
    if (isDefault) {
      const userPhones = await this.userPhoneRepository.findAllByUser(user_id);
      if (userPhones.length > 0) {
        const promisesUserPhones = userPhones.map(uPhone => {
          Object.assign(uPhone, { default: false });
          return this.userPhoneRepository.updateDefault(uPhone);
        });
        await Promise.all(promisesUserPhones);
      }
    } else {
      const userPhones = await this.userPhoneRepository.findAllByUser(user_id);
      if (userPhones.length === 0) {
        isFirst = true;
      }
    }
    const userPhone = await this.userPhoneRepository.create({
      user_id,
      phone_number,
      default: isDefault || isFirst,
    });

    return userPhone;
  }
}
export default CreateUserPhoneService;
