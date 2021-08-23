import ICreatePaymentCard from '@modules/orders/dtos/ICreatePaymentCard';
import IPaymentCardRepository from '@modules/orders/repositories/IPaymentCardRepository';
import { getRepository, Repository } from 'typeorm';
import PaymentCard from '../entities/PaymentCard';

class PaymentCardRepository implements IPaymentCardRepository {
  private ormRepository: Repository<PaymentCard>;

  constructor() {
    this.ormRepository = getRepository(PaymentCard);
  }

  async create(data: ICreatePaymentCard): Promise<PaymentCard> {
    const cardPagarmeObject = this.ormRepository.create(data);
    const cardPagarme = await this.ormRepository.save(cardPagarmeObject);
    return cardPagarme;
  }
}

export default PaymentCardRepository;
