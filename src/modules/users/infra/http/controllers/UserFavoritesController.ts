import CreateUserFavoritesService from '@modules/users/services/UserFavorites/CreateUserFavoritesService';
import DeleteUserFavoritesService from '@modules/users/services/UserFavorites/DeleteUserFavoritesService';
import ListUserFavoritesService from '@modules/users/services/UserFavorites/ListUserFavoritesService';
import ShowUserFavoritesService from '@modules/users/services/UserFavorites/ShowUserFavoritesService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UserFavoritesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.body;
    const user_id = request.user.id;

    const userFavoritesCreate = container.resolve(CreateUserFavoritesService);

    const user = await userFavoritesCreate.execute({ user_id, product_id });

    return response.json(classToClass(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;
    const user_id = request.user.id;

    const userFavoritesDelete = container.resolve(DeleteUserFavoritesService);

    await userFavoritesDelete.execute({ user_id, product_id });

    return response.json({ message: 'Product removed from favorites' });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const userFavoritesList = container.resolve(ListUserFavoritesService);

    const user = await userFavoritesList.execute(user_id);

    return response.json(classToClass(user.favorite_products));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;
    const user_id = request.user.id;

    const showUserFavorites = container.resolve(ShowUserFavoritesService);

    const product = await showUserFavorites.execute({ user_id, product_id });

    return response.json(classToClass(product));
  }
}
export default UserFavoritesController;
