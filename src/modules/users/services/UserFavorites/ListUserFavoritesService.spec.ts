import Product from '@modules/products/infra/typeorm/entities/Product';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ListUserFavoritesService from './ListUserFavoritesService';

let fakeUsersRepository: FakeUsersRepository;
let fakeProductsRepository: FakeProductsRepository;
let listUserFavoritesService: ListUserFavoritesService;

let user: User;
let product: Product;

describe('User Favorite List', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeProductsRepository = new FakeProductsRepository();
    listUserFavoritesService = new ListUserFavoritesService(
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
  it('Should be able add list all favorites products', async () => {
    user.favorite_products = [product];
    const userFavorites = await listUserFavoritesService.execute(user.id);
    expect(userFavorites.favorite_products).toHaveLength(1);
  });
  it('Should be able add list a empty list', async () => {
    const userFavorites = await listUserFavoritesService.execute(user.id);
    expect(userFavorites.favorite_products).toHaveLength(0);
  });
  it('Should not be able list favorites if user id is invalid', async () => {
    await expect(
      listUserFavoritesService.execute('invalid-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
