import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import ShowCategoryService from './ShowCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let showCategoryService: ShowCategoryService;

describe('Category Show', () => {
  beforeEach(async () => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    showCategoryService = new ShowCategoryService(fakeCategoriesRepository);
  });

  it('Should be able show a category', async () => {
    const category = await fakeCategoriesRepository.create('Congelados');
    const categoryFinded = await showCategoryService.execute(category.id);

    expect(categoryFinded).not.toBeNull();
    expect(categoryFinded).toHaveProperty('id');
  });
  it('Should not be able show a category with invalid id', async () => {
    await expect(
      showCategoryService.execute('invalid-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
