import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  product_id: string;
}

@injectable()
class DeleteUserFavoritesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, product_id }: IRequest): Promise<User> {
    let userExists = await this.usersRepository.findByIdWithRelations({
      user_id,
      relations: ['favorite_products'],
    });

    if (!userExists) {
      throw new AppError('Only authenticate users can change avatar', 401);
    }
    const beforeLength = userExists.favorite_products.length;

    userExists.favorite_products = userExists.favorite_products.filter(
      prod => prod.id !== product_id,
    );
    if (beforeLength !== userExists.favorite_products.length) {
      userExists = await this.usersRepository.update(userExists);
    }

    return userExists;
  }
}
export default DeleteUserFavoritesService;
