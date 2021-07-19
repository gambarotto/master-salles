import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import SetUserAdressesAsDefaultService from '@modules/users/services/UserAdresses/SetUserAdressesAsDefaultService';

class UserAdressesSetDefaultController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { address_id } = request.params;
    const user_id = request.user.id;

    const setUserAddressAsDefault = container.resolve(
      SetUserAdressesAsDefaultService,
    );

    const userAddress = await setUserAddressAsDefault.execute({
      user_id,
      userAddress_id: address_id,
    });
    return response.json(classToClass(userAddress));
  }
}

export default UserAdressesSetDefaultController;
