import ICreateSaleDTO from '../dtos/ICreateSaleDTO';

export default interface IOrdersTransactions {
  createSale(data: ICreateSaleDTO): Promise<void>;
}
