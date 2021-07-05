import CreateUserWithFacebookService from '@modules/users/services/CreateUserWithFacebookService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UsersFacebookController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, avatar_social_media } = request.body;
    const createUserFb = container.resolve(CreateUserWithFacebookService);
    const user = await createUserFb.execute({
      name,
      email,
      password,
      avatar_social_media,
    });
    return response.json(classToClass(user));
  }
}

export default UsersFacebookController;
