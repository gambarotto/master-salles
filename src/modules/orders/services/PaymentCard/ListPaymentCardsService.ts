import PaymentCardRepository from '@modules/orders/infra/typeorm/repositories/PaymentCardRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import IResponsePaymentCardDTO from '@shared/container/providers/GatewayProvider/dtos/IResponsePaymentCardDTO';
import IGatewayProvider from '@shared/container/providers/GatewayProvider/models/IGatewayProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListPaymentCardsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('PaymentCardRepository')
    private paymentCardRepository: PaymentCardRepository,
    @inject('GatewayProvider')
    private gatewayProvider: IGatewayProvider,
  ) {}

  async execute(user_id: string): Promise<IResponsePaymentCardDTO[]> {
    const user = await this.usersRepository.findById({ user_id });
    if (!user) {
      throw new AppError('Invalid user');
    }
    const cards = await this.paymentCardRepository.findAllByUser(user_id);
    const cardsPagarme = this.gatewayProvider.getCreditCards(cards);

    return cardsPagarme;
  }
}
export default ListPaymentCardsService;
