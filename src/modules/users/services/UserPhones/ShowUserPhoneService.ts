import UserPhone from '@modules/users/infra/typeorm/entities/UserPhone';
import IUserPhoneRepository from '@modules/users/repositories/IUserPhoneRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  phone_number_id: string;
}

@injectable()
class ShowUserPhoneService {
  constructor(
    @inject('UserPhoneRepository')
    private userPhoneRepository: IUserPhoneRepository,
  ) {}

  async execute({ user_id, phone_number_id }: IRequest): Promise<UserPhone> {
    const userPhone = await this.userPhoneRepository.findByUserAndId({
      user_id,
      phone_number_id,
    });
    if (!userPhone) {
      throw new AppError('Phone not found');
    }
    return userPhone;
  }
}
export default ShowUserPhoneService;
