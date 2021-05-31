import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import ListCategoriesService from './ListCategoriesService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let listCategoriesService: ListCategoriesService;

describe('Category List', () => {
  beforeEach(async () => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    listCategoriesService = new ListCategoriesService(fakeCategoriesRepository);
  });

  it('Should be able list all categories', async () => {
    await fakeCategoriesRepository.create('Congelados');
    await fakeCategoriesRepository.create('Refrigerados');
    const categories = await listCategoriesService.execute();

    expect(categories).toHaveLength(2);
  });
  it('Should be able list no categories', async () => {
    const categories = await listCategoriesService.execute();

    expect(categories).toHaveLength(0);
  });
});
