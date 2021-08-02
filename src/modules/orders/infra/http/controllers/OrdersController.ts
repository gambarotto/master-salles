import CreateOrdersService from '@modules/orders/services/CreateOrdersService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const {
      amount,
      delivery_fee,
      card_hash,
      card_id,
      shipping_address_id,
      billing_address_id,
      items,
    } = request.body;

    const createOrder = container.resolve(CreateOrdersService);
    await createOrder.execute({
      amount,
      user_id,
      delivery_fee,
      card_hash,
      card_id,
      shipping_address_id,
      billing_address_id,
      itemsRequest: items,
    });
    return response.json({ message: 'ok' });
  }
}
export default OrdersController;
