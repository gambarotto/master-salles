import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  product_id: string;
}

@injectable()
class CreateUserFavoritesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('ProductsRepository')
    private productRepository: IProductsRepository,
  ) {}

  async execute({ user_id, product_id }: IRequest): Promise<User> {
    let userExists = await this.usersRepository.findById({
      user_id,
      relations: ['favorite_products'],
    });

    if (!userExists) {
      throw new AppError('Only authenticate users can change avatar', 401);
    }
    const product = await this.productRepository.findById({
      product_id,
    });
    if (!product) {
      throw new AppError('Product not found');
    }

    const alreadyExists = userExists.favorite_products.findIndex(
      prod => prod.id === product_id,
    );
    if (alreadyExists < 0) {
      userExists.favorite_products = [...userExists.favorite_products, product];
      userExists = await this.usersRepository.update(userExists);
    }
    return userExists;
  }
}
export default CreateUserFavoritesService;
