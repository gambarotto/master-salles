import CreateSecretService from '@modules/users/services/CreateSecretService';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({
      name,
      email,
      password,
    });
    return response.json(classToClass(user));
  }

  public async getSecret(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const createSecret = container.resolve(CreateSecretService);
    const secret = await createSecret.execute(user_id);
    return response.json(secret);
  }
}

export default UsersController;
