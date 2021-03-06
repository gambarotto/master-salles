import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SessionUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateUserService);
    const user = await authenticateUser.execute({
      email,
      password,
    });
    return response.json(classToClass(user));
  }
}

export default SessionUserController;
