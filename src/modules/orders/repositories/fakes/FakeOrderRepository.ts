import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import IFindByIdAndUserDTO from '@modules/orders/dtos/IFindByIdAndUserDTO';
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
    Object.assign(orderCreated, { id: v4(), ...data });
    this.orders.push(orderCreated);
    return orderCreated;
  }

  async findByIdAndUserId({
    user_id,
    order_id,
  }: IFindByIdAndUserDTO): Promise<Order | undefined> {
    const orderFinded = this.orders.find(
      order => order.id === order_id && order.user_id === user_id,
    );
    return orderFinded;
  }

  async findAllByUser(user_id: string): Promise<Order[]> {
    return this.orders.filter(order => order.user_id === user_id);
  }
}

export default FakeOrderRepository;
