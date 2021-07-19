import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListUserFavoritesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(user_id: string): Promise<User> {
    const userExists = await this.usersRepository.findById({
      user_id,
      relations: [
        'favorite_products',
        'favorite_products.photos',
        'favorite_products.category_id',
      ],
    });

    if (!userExists) {
      throw new AppError('Only authenticate users can change avatar', 401);
    }
    return userExists;
  }
}
export default ListUserFavoritesService;
