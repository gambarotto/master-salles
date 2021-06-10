import Employee from '@modules/employees/infra/typeorm/entities/Employee';
import FakeEmployeesRepository from '@modules/employees/repositories/fakes/FakeEmployeesRepository';
import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import UpdateCategoryService from './UpdateCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let fakeEmployeesRepository: FakeEmployeesRepository;
let updateCategoryService: UpdateCategoryService;
let employee: Employee;
describe('Category Update', () => {
  beforeEach(async () => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeEmployeesRepository = new FakeEmployeesRepository();
    updateCategoryService = new UpdateCategoryService(
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

  it('Should be able update a category', async () => {
    const category = await fakeCategoriesRepository.create('Congelados');
    const categoryUpdated = await updateCategoryService.execute({
      employee_id: employee.id,
      category_id: category.id,
      name: 'Doces',
    });
    expect(categoryUpdated).toHaveProperty('id');
    expect(categoryUpdated.name).toBe('Doces');
  });
  it('Should be able update a category without name', async () => {
    const category = await fakeCategoriesRepository.create('Congelados');
    const categoryUpdated = await updateCategoryService.execute({
      employee_id: employee.id,
      category_id: category.id,
    });
    expect(categoryUpdated).toHaveProperty('id');
    expect(categoryUpdated.name).toBe('Congelados');
  });
  it('Should not be able update a category with the same name', async () => {
    await fakeCategoriesRepository.create('Congelados');
    const cat = await fakeCategoriesRepository.create('Doces');
    await expect(
      updateCategoryService.execute({
        employee_id: employee.id,
        category_id: cat.id,
        name: 'Congelados',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able update a category if employee does not have privilegies', async () => {
    employee.responsibility = 'seller';
    const category = await fakeCategoriesRepository.create('Congelados');

    await expect(
      updateCategoryService.execute({
        employee_id: employee.id,
        category_id: category.id,
        name: 'Doces',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able update a category if employee id is invalid', async () => {
    const category = await fakeCategoriesRepository.create('Congelados');
    await expect(
      updateCategoryService.execute({
        employee_id: 'invalid-id',
        category_id: category.id,
        name: 'Congelados',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able update a category if category id is invalid', async () => {
    await expect(
      updateCategoryService.execute({
        employee_id: employee.id,
        category_id: 'invalid-id',
        name: 'Congelados',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
