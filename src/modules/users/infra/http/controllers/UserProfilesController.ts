import DeleteUserProfileService from '@modules/users/services/UserProfile/DeleteUserProfileService';
import ShowUserProfileService from '@modules/users/services/UserProfile/ShowUserProfileService';
import UpdateUserProfileService from '@modules/users/services/UserProfile/UpdateUserProfileService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UserProfilesController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, new_password } = request.body;
    const updateUserProfile = container.resolve(UpdateUserProfileService);
    const updatedUser = await updateUserProfile.execute({
      user_id,
      name,
      email,
      old_password,
      new_password,
    });
    return response.json(classToClass(updatedUser));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { password } = request.body;

    const deleteProfileUser = container.resolve(DeleteUserProfileService);
    await deleteProfileUser.execute({ user_id, password });

    return response.json({ message: 'Success on delete user' });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfileUser = container.resolve(ShowUserProfileService);
    const userProfile = await showProfileUser.execute({ user_id });

    return response.json(classToClass(userProfile));
  }
}

export default UserProfilesController;
