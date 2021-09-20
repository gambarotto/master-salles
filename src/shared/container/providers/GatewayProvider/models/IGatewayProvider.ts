import PaymentCard from '@modules/orders/infra/typeorm/entities/PaymentCard';
import ICreateTransationCCDTO from '../dtos/ICreateTransationCCDTO';
import IResponsePaymentCardDTO from '../dtos/IResponsePaymentCardDTO';
import IResponseTransactionDTO from '../dtos/IResponseTransaction';

export default interface IGatewayProvider {
  createTransaction(
    data: ICreateTransationCCDTO,
  ): Promise<IResponseTransactionDTO>;
  getCreditCards(
    payment_cards: PaymentCard[],
  ): Promise<IResponsePaymentCardDTO[]>;
  createCardHash(hash: string): Promise<string>;
}
