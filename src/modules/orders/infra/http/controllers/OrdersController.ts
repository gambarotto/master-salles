import CreateOrdersService from '@modules/orders/services/CreateOrdersService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import OrdersTransactions from '../../typeorm/transactions/OrdersTransactions';

class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const {
      amount,
      delivery_fee,
      delivery,
      card_hash,
      card_id,
      card,
      shipping_address_id,
      billing_address_id,
      items,
    } = request.body;
    const createOrder = container.resolve(CreateOrdersService);
    const transaction = await createOrder.execute({
      amount,
      user_id,
      delivery,
      delivery_fee,
      card_hash,
      card_id,
      card,
      shipping_address_id,
      billing_address_id,
      itemsRequest: items,
    });

    const createTransaction = container.resolve(OrdersTransactions);
    const order = await createTransaction.createSale({
      user_id,
      amount,
      delivery_fee,
      delivery,
      shipping_address_id,
      billing_address_id,
      cardId: card_id,
      transactionData: transaction,
      items,
    });

    return response.json(order);
  }
}
export default OrdersController;
