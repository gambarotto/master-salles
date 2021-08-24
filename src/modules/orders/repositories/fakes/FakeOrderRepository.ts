import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import { v4 } from 'uuid';
import IOrderRepository from '../IOrderRepository';

class FakeOrderRepository implements IOrderRepository {
  private orders: Order[];

  constructor() {
    this.orders = [];
  }

  async create(data: ICreateOrderDTO): Promise<Order> {
    const orderCreated = new Order();
    Object.assign(orderCreated, { id: v4(), data });
    this.orders.push(orderCreated);
    return orderCreated;
  }
}

export default FakeOrderRepository;
