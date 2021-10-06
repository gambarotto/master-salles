import ListAvailableDaysDeliveryService from '@modules/users/services/UserAvailableDaysDelivery/ListAvailableDaysDeliveryService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UserAvailableDaysDeliveryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { user_address_id } = request.params;

    const listAvailableDaysDelivery = container.resolve(
      ListAvailableDaysDeliveryService,
    );
    const availableDays = await listAvailableDaysDelivery.execute({
      user_id,
      user_address_id,
    });

    return response.json(availableDays);
  }
}
export default UserAvailableDaysDeliveryController;
