import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import IFindByIdAndUserDTO from '@modules/orders/dtos/IFindByIdAndUserDTO';
import IOrderRepository from '@modules/orders/repositories/IOrderRepository';
import { getRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  async create(data: ICreateOrderDTO): Promise<Order> {
    const orderCreated = new Order();
    Object.assign(orderCreated, data);
    // const orderCreated = this.ormRepository.create(data);
    const order = await this.ormRepository.save([orderCreated]);
    return order[0];
  }

  async findByIdAndUserId({
    user_id,
    order_id,
  }: IFindByIdAndUserDTO): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne({
      where: { id: order_id, user_id },
      relations: [
        'transaction_id',
        'order_product',
        'billing_address_id',
        'shipping_address_id',
      ],
    });
    return order;
  }

  async findAllByUser(user_id: string): Promise<Order[]> {
    const orders = await this.ormRepository.find({
      where: { user_id },
      order: { created_at: 'DESC' },
    });
    return orders;
  }
}
export default OrderRepository;
