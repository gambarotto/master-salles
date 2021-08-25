import CreateOrderService from '@modules/orders/services/CreateOrderService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

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
    const createOrder = container.resolve(CreateOrderService);
    const order = await createOrder.execute({
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

    return response.json(order);
  }
}
export default OrdersController;
