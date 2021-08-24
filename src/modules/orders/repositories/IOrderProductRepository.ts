import ICreateOrderProductDTO from '../dtos/ICreateOrderProductDTO';
import OrderProduct from '../infra/typeorm/entities/OrderProduct';

export default interface IOrderProductRepository {
  create(data: ICreateOrderProductDTO): Promise<OrderProduct>;
}
