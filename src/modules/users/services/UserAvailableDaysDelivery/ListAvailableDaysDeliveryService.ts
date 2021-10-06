import IUserAdressesRepository from '@modules/users/repositories/IUserAdressesRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import AvailableDayToDelivery, {
  IAvailableDaysResponse,
} from '@shared/helpers/AvailableDayToDelivery';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  user_address_id: string;
}
@injectable()
class ListAvailableDaysDeliveryService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserAdressesRepository')
    private userAdressesRepository: IUserAdressesRepository,
  ) {}

  public async execute({
    user_id,
    user_address_id,
  }: IRequest): Promise<IAvailableDaysResponse[]> {
    const user = await this.usersRepository.findById({ user_id });
    if (!user) {
      throw new AppError('User dos not exists');
    }
    const userAddress = await this.userAdressesRepository.findById(
      user_address_id,
    );
    if (!userAddress || userAddress.user_id !== user.id) {
      throw new AppError('UserAddress invalid');
    }
    const initialDate = new Date();
    const availableDayToDelivery = new AvailableDayToDelivery();
    const availableDays = availableDayToDelivery.verifyAvailableDays({
      city: userAddress.city,
      initialDate,
    });
    return availableDays;
  }
}
export default ListAvailableDaysDeliveryService;
