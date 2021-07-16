import Product from '@modules/products/infra/typeorm/entities/Product';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  product_id: string;
}

@injectable()
class ShowUserFavoritesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, product_id }: IRequest): Promise<Product> {
    const userExists = await this.usersRepository.findById({
      user_id,
      relations: ['favorite_products', 'favorite_products.photo'],
    });

    if (!userExists) {
      throw new AppError('Only authenticate users can change avatar', 401);
    }

    const product = userExists.favorite_products.find(
      prod => prod.id === product_id,
    );
    if (!product) {
      throw new AppError('You do not have this product in your favorites');
    }
    return product;
  }
}
export default ShowUserFavoritesService;
