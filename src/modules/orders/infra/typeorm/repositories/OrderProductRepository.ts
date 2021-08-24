import ICreateOrderProductDTO from '@modules/orders/dtos/ICreateOrderProductDTO';
import IOrderProductRepository from '@modules/orders/repositories/IOrderProductRepository';
import { getRepository, Repository } from 'typeorm';
import OrderProduct from '../entities/OrderProduct';

class OrderProductRepository implements IOrderProductRepository {
  private ormRepository: Repository<OrderProduct>;

  constructor() {
    this.ormRepository = getRepository(OrderProduct);
  }

  async create(data: ICreateOrderProductDTO): Promise<OrderProduct> {
    const orderProductObject = this.ormRepository.create(data);
    const orderProduct = await this.ormRepository.save(orderProductObject);
    return orderProduct;
  }
}

export default OrderProductRepository;
