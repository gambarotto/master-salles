import ICreatePaymentCard from '../dtos/ICreatePaymentCard';
import PaymentCard from '../infra/typeorm/entities/PaymentCard';

export default interface IPaymentCardRepository {
  create(data: ICreatePaymentCard): Promise<PaymentCard>;
}
