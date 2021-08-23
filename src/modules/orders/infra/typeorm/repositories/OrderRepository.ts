import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
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
}
export default OrderRepository;
