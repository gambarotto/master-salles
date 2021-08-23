import ICreateSaleDTO from '../dtos/ICreateSaleDTO';
import Order from '../infra/typeorm/entities/Order';

export default interface IOrdersTransactions {
  createSale(data: ICreateSaleDTO): Promise<Order | undefined>;
}
