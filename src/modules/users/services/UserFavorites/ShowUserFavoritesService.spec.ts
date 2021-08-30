import Product from '@modules/products/infra/typeorm/entities/Product';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ShowUserFavoritesService from './ShowUserFavoritesService';

let fakeUsersRepository: FakeUsersRepository;
let fakeProductsRepository: FakeProductsRepository;
let showUserFavoritesService: ShowUserFavoritesService;

let user: User;
let product: Product;

describe('User Favorite Show', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeProductsRepository = new FakeProductsRepository();
    showUserFavoritesService = new ShowUserFavoritesService(
      fakeUsersRepository,
    );
    user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
    product = await fakeProductsRepository.create({
      name: 'Doce de Leite',
      package: '500g',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      cost_price: 7.9,
      sale_price: 10.0,
      category_id: [],
    });
  });
  it('Should be able add show a favorite product', async () => {
    user.favorite_products = [product];
    const favoriteProduct = await showUserFavoritesService.execute({
      user_id: user.id,
      product_id: product.id,
    });
    expect(favoriteProduct).toHaveProperty('id');
  });
  it('Should not be able show a favorite product if user id is invalid', async () => {
    await expect(
      showUserFavoritesService.execute({
        user_id: 'invalid-id',
        product_id: product.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able show a favorite product if this product there is no in favorites', async () => {
    await expect(
      showUserFavoritesService.execute({
        user_id: user.id,
        product_id: 'product-id-invalid',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
