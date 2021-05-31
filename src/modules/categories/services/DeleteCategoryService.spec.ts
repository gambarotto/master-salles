import Employee from '@modules/employees/infra/typeorm/entities/Employee';
import FakeEmployeesRepository from '@modules/employees/repositories/fakes/FakeEmployeesRepository';
import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import DeleteCategoryService from './DeleteCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let fakeEmployeesRepository: FakeEmployeesRepository;
let deleteCategoryService: DeleteCategoryService;
let employee: Employee;
describe('Category Delete', () => {
  beforeEach(async () => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeEmployeesRepository = new FakeEmployeesRepository();
    deleteCategoryService = new DeleteCategoryService(
      fakeCategoriesRepository,
      fakeEmployeesRepository,
    );
    employee = await fakeEmployeesRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
      responsibility: 'admin',
    });
  });

  it('Should be able delete a category', async () => {
    const category = await fakeCategoriesRepository.create('Congelados');
    await deleteCategoryService.execute({
      employee_id: employee.id,
      category_id: category.id,
    });
    const categories = await fakeCategoriesRepository.findAllCategories();
    expect(categories).toHaveLength(0);
  });

  it('Should not be able delete a category if employee does not have privilegies', async () => {
    employee.responsibility = 'seller';
    const category = await fakeCategoriesRepository.create('Congelados');

    await expect(
      deleteCategoryService.execute({
        employee_id: employee.id,
        category_id: category.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able delete a category if employee id is invalid', async () => {
    const category = await fakeCategoriesRepository.create('Congelados');
    await expect(
      deleteCategoryService.execute({
        employee_id: 'invalid-id',
        category_id: category.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able delete a category if category id is invalid', async () => {
    await expect(
      deleteCategoryService.execute({
        employee_id: employee.id,
        category_id: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
