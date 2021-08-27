import UserPhone from '@modules/users/infra/typeorm/entities/UserPhone';
import IUserPhoneRepository from '@modules/users/repositories/IUserPhoneRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  phone_number_id: string;
  phone_number: string;
  isDefault: boolean;
}

@injectable()
class UpdateUserPhoneService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserPhoneRepository')
    private userPhoneRepository: IUserPhoneRepository,
  ) {}

  async execute({
    user_id,
    phone_number_id,
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
    const uPhone = await this.userPhoneRepository.findByUserAndId({
      user_id,
      phone_number_id,
    });
    if (!uPhone) {
      throw new AppError('Phone non-exists');
    }
    const userPhones = await this.userPhoneRepository.findAllByUser(user_id);

    if (isDefault && !uPhone.default) {
      if (userPhones.length > 1) {
        const promisesUserPhones = userPhones.map(phone => {
          Object.assign(phone, { default: false });
          return this.userPhoneRepository.updateDefault(phone);
        });
        await Promise.all(promisesUserPhones);
      }
    } else if (!isDefault && uPhone.default) {
      const anotherUserPhone = userPhones.find(phone => phone.id !== uPhone.id);
      if (!anotherUserPhone) {
        throw new AppError(
          'You need to set another phone number as default before setting this one as non-default',
        );
      }
      Object.assign(anotherUserPhone, { default: true });
      await this.userPhoneRepository.updateDefault(anotherUserPhone);
    }

    if (!isDefault && !uPhone.default && userPhones.length === 1) {
      throw new AppError('Please inform the administrator');
    }
    uPhone.phone_number = phone_number;
    uPhone.default = isDefault;

    const userPhone = await this.userPhoneRepository.update(uPhone);

    return userPhone;
  }
}
export default UpdateUserPhoneService;
