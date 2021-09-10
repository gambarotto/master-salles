import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ListOrderService from '@modules/orders/services/ListOrderService';
import ShowOrderService from '@modules/orders/services/ShowOrderService';
import { classToClass } from 'class-transformer';
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
      shipping_address_id,
      billing_address_id,
      itemsRequest: items,
    });

    return response.json(classToClass(order));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { order_id } = request.params;

    const showOrderService = container.resolve(ShowOrderService);
    const order = await showOrderService.execute({ user_id, order_id });

    return response.json(classToClass(order));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listOrderService = container.resolve(ListOrderService);
    const orders = await listOrderService.execute({ user_id });

    return response.json(classToClass(orders));
  }
}
export default OrdersController;
