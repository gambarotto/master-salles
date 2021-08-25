import ICreateOrderDTO from '../dtos/ICreateOrderDTO';
import IFindByIdAndUserDTO from '../dtos/IFindByIdAndUserDTO';
import Order from '../infra/typeorm/entities/Order';

export default interface IOrderRepository {
  create(data: ICreateOrderDTO): Promise<Order>;
  findByIdAndUserId({
    user_id,
    order_id,
  }: IFindByIdAndUserDTO): Promise<Order | undefined>;
  findAllByUser(user_id: string): Promise<Order[]>;
}
