import ICreatePaymentCard from '@modules/orders/dtos/ICreatePaymentCard';
import PaymentCard from '@modules/orders/infra/typeorm/entities/PaymentCard';
import { v4 } from 'uuid';
import IPaymentCardRepository from '../IPaymentCardRepository';

class FakePaymentCardRepository implements IPaymentCardRepository {
  private paymentCards: PaymentCard[];

  constructor() {
    this.paymentCards = [];
  }

  async create(data: ICreatePaymentCard): Promise<PaymentCard> {
    const paymentCardCreated = new PaymentCard();
    Object.assign(paymentCardCreated, { id: v4(), data });
    this.paymentCards.push(paymentCardCreated);
    return paymentCardCreated;
  }
}

export default FakePaymentCardRepository;
