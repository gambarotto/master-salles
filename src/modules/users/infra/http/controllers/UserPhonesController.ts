import CreateUserPhoneService from '@modules/users/services/UserPhones/CreateUserPhoneService';
import DeleteUserPhoneService from '@modules/users/services/UserPhones/DeleteUserPhoneService';
import ListUserPhoneService from '@modules/users/services/UserPhones/ListUserPhoneService';
import ShowUserPhoneService from '@modules/users/services/UserPhones/ShowUserPhoneService';
import UpdateUserPhoneService from '@modules/users/services/UserPhones/UpdateUserPhoneService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UserPhonesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { phone_number, isDefault } = request.body;

    const createUserPhone = container.resolve(CreateUserPhoneService);
    const userPhone = await createUserPhone.execute({
      user_id,
      phone_number,
      isDefault,
    });

    return response.json(userPhone);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { phone_number_id } = request.params;

    const showUserPhone = container.resolve(ShowUserPhoneService);
    const userPhone = await showUserPhone.execute({
      user_id,
      phone_number_id,
    });

    return response.json(userPhone);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listUserPhone = container.resolve(ListUserPhoneService);
    const userPhones = await listUserPhone.execute({
      user_id,
    });

    return response.json(userPhones);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { phone_number, isDefault } = request.body;
    const { phone_number_id } = request.params;

    const updateUserPhone = container.resolve(UpdateUserPhoneService);
    const userPhone = await updateUserPhone.execute({
      user_id,
      phone_number_id,
      phone_number,
      isDefault,
    });

    return response.json(userPhone);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { phone_number_id } = request.params;

    const deleteUserPhone = container.resolve(DeleteUserPhoneService);
    await deleteUserPhone.execute({
      user_id,
      phone_number_id,
    });

    return response.json({ message: 'User phone was deleted' });
  }
}
export default UserPhonesController;
