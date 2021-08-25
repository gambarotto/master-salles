import IUsersRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Order from '../infra/typeorm/entities/Order';
import IOrderRepository from '../repositories/IOrderRepository';

interface IRequest {
  user_id: string;
  order_id: string;
}

@injectable()
class ShowOrderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  async execute({ user_id, order_id }: IRequest): Promise<Order> {
    const userExists = await this.usersRepository.findById({ user_id });
    if (!userExists) {
      throw new AppError('User not found');
    }
    const order = await this.orderRepository.findByIdAndUserId({
      user_id,
      order_id,
    });
    if (!order) {
      throw new AppError('Order not found');
    }
    return order;
  }
}
export default ShowOrderService;
