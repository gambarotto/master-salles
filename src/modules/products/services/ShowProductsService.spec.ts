import Category from '@modules/categories/infra/typeorm/entities/Category';
import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';
import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import ShowProductService from './ShowProductsService';

let fakeProductsRepository: FakeProductsRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let showProductService: ShowProductService;

let category1: Category;
let category2: Category;

describe('Product Show', () => {
  beforeEach(async () => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();
    showProductService = new ShowProductService(fakeProductsRepository);

    category1 = await fakeCategoriesRepository.create('Congelados');
    category2 = await fakeCategoriesRepository.create('Doces');
  });
  it('Should be able show a product', async () => {
    const prod = await fakeProductsRepository.create({
      name: 'Doce de Leite',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      cost_price: 7.9,
      sale_price: 10.0,
      category_id: [category1, category2],
    });
    const product = await showProductService.execute(prod.id);
    expect(product).toHaveProperty('id');
  });
  it('Should not be able show a product', async () => {
    await expect(
      showProductService.execute('invalid-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
