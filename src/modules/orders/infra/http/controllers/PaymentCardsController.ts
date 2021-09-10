import ListPaymentCardsService from '@modules/orders/services/PaymentCard/ListPaymentCardsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class PaymentCardsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listPaymentCards = container.resolve(ListPaymentCardsService);
    const cards = await listPaymentCards.execute(user_id);

    return response.json(cards);
  }
}
export default PaymentCardsController;
