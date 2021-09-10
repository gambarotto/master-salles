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

  async findAllByUser(user_id: string): Promise<PaymentCard[]> {
    const cards = await this.ormRepository.find({ where: { user_id } });
    return cards;
  }
}

export default PaymentCardRepository;
