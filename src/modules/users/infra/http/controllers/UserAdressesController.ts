import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUserAdressesService from '@modules/users/services/UserAddresses/CreateUserAdressesService';
import DeleteUserAdressesService from '@modules/users/services/UserAddresses/DeleteUserAdressesService';
import ListUserAdressesProvider from '@modules/users/services/UserAddresses/ListUserAdressesProvider';
import UpdateUserAdressesService from '@modules/users/services/UserAddresses/UpdateUserAdressesService';

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

    const createUserAddress = container.resolve(CreateUserAdressesService);

    const userAddress = await createUserAddress.execute({
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
    const updatedUserAddress = await updateUserAddressService.execute({
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

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteUserAddress = container.resolve(DeleteUserAdressesService);

    await deleteUserAddress.execute({
      user_id: request.user.id,
      address_id: request.params.address_id,
    });
    return response.json({ message: 'success' });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listUserAdresses = container.resolve(ListUserAdressesProvider);
    const userAdresses = await listUserAdresses.execute(user_id);
    return response.json(classToClass(userAdresses));
  }
}

export default UserAdressesController;
