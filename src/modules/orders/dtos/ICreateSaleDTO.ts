import IResponseTransactionDTO from '@shared/container/providers/GatewayProvider/dtos/IResponseTransaction';
import ICreateOrderDTO from './ICreateOrderDTO';

export default interface ICreateSaleDTO {
  user_id: string;
  cardId: string | undefined;
  transactionData: IResponseTransactionDTO;
  orderData: ICreateOrderDTO;
}
