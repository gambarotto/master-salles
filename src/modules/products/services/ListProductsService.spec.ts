import Category from '@modules/categories/infra/typeorm/entities/Category';
import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import ListProductsService from './ListProductsService';

let fakeProductsRepository: FakeProductsRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let listProductsService: ListProductsService;

let category1: Category;
let category2: Category;

describe('Product List', () => {
  beforeEach(async () => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();
    listProductsService = new ListProductsService(fakeProductsRepository);

    category1 = await fakeCategoriesRepository.create('Congelados');
    category2 = await fakeCategoriesRepository.create('Doces');
  });
  it('Should be able list all products', async () => {
    await fakeProductsRepository.create({
      name: 'Doce de Leite',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      cost_price: 7.9,
      sale_price: 10.0,
      category_id: [category1, category2],
    });
    const products = await listProductsService.execute();
    expect(products).toHaveLength(1);
  });
});
