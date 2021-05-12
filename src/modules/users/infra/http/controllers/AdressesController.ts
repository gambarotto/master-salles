import CreateUserAdressesService from '@modules/users/services/UserAddresses/CreateUserAdressesService';
import UpdateUserAdressesService from '@modules/users/services/UserAddresses/UpdateUserAdressesService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UserAdressesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      street,
      number,
      district,
      city,
      zip_code,
      complement,
      reference_point,
      alias,
    } = request.body;
    const user_id = request.user.id;

    const createUser = container.resolve(CreateUserAdressesService);

    const userAddress = await createUser.execute({
      user_id,
      street,
      number,
      district,
      city,
      zip_code,
      complement,
      reference_point,
      alias,
    });
    return response.json(classToClass(userAddress));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      id,
      street,
      number,
      district,
      city,
      zip_code,
      complement,
      reference_point,
      alias,
    } = request.body;

    const updateUserAddressService = container.resolve(
      UpdateUserAdressesService,
    );

    const updatedUserAddress = updateUserAddressService.execute({
      user_id,
      id,
      street,
      number,
      district,
      city,
      zip_code,
      complement,
      reference_point,
      alias,
    });
    return response.json(updatedUserAddress);
  }
}

export default UserAdressesController;
