import Product from '@modules/products/infra/typeorm/entities/Product';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import CreateUserFavoritesService from './CreateUserFavoritesService';

let fakeUsersRepository: FakeUsersRepository;
let fakeProductsRepository: FakeProductsRepository;
let createUserFavoritesService: CreateUserFavoritesService;

let user: User;
let product: Product;

describe('User Favorite Create', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeProductsRepository = new FakeProductsRepository();
    createUserFavoritesService = new CreateUserFavoritesService(
      fakeUsersRepository,
      fakeProductsRepository,
    );
    user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
    product = await fakeProductsRepository.create({
      name: 'Doce de Leite',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      cost_price: 7.9,
      sale_price: 10.0,
      category_id: [],
    });
  });
  it('Should be able add a new favorite product', async () => {
    const userUpdated = await createUserFavoritesService.execute({
      user_id: user.id,
      product_id: product.id,
    });
    expect(userUpdated.favorite_products).toHaveLength(1);
  });
  it('Should not be able add a new favorite product if it already in favorites', async () => {
    user.favorite_products = [product];
    const userUpdated = await createUserFavoritesService.execute({
      user_id: user.id,
      product_id: product.id,
    });
    expect(userUpdated.favorite_products).toHaveLength(1);
  });
  it('Should not be able add a new favorite if product id is invalid', async () => {
    await expect(
      createUserFavoritesService.execute({
        user_id: user.id,
        product_id: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able add a new favorite if user id is invalid', async () => {
    await expect(
      createUserFavoritesService.execute({
        user_id: 'invalid-id',
        product_id: product.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
