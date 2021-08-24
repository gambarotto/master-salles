import ICreateOrderProductDTO from '@modules/orders/dtos/ICreateOrderProductDTO';
import OrderProduct from '@modules/orders/infra/typeorm/entities/OrderProduct';
import { v4 } from 'uuid';
import IOrderProductRepository from '../IOrderProductRepository';

class FakeOrderProductRepository implements IOrderProductRepository {
  private orderProducts: OrderProduct[];

  constructor() {
    this.orderProducts = [];
  }

  async create(data: ICreateOrderProductDTO): Promise<OrderProduct> {
    const orderProductCreated = new OrderProduct();
    Object.assign(orderProductCreated, { id: v4(), data });
    this.orderProducts.push(orderProductCreated);
    return orderProductCreated;
  }
}

export default FakeOrderProductRepository;
