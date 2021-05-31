import Employee from '@modules/employees/infra/typeorm/entities/Employee';
import FakeEmployeesRepository from '@modules/employees/repositories/fakes/FakeEmployeesRepository';
import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import CreateCategoryService from './CreateCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let fakeEmployeesRepository: FakeEmployeesRepository;
let createCategoryService: CreateCategoryService;
let employee: Employee;
describe('Category Create', () => {
  beforeEach(async () => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeEmployeesRepository = new FakeEmployeesRepository();
    createCategoryService = new CreateCategoryService(
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

  it('Should be able create a new category', async () => {
    const category = await createCategoryService.execute({
      employee_id: employee.id,
      name: 'Congelados',
    });
    expect(category).toHaveProperty('id');
    expect(category.name).toBe('Congelados');
  });
  it('Should not be able create a new category with the same name', async () => {
    await createCategoryService.execute({
      employee_id: employee.id,
      name: 'Congelados',
    });
    await expect(
      createCategoryService.execute({
        employee_id: employee.id,
        name: 'Congelados',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able create a new category if employee does not have privilegies', async () => {
    employee.responsibility = 'seller';
    await expect(
      createCategoryService.execute({
        employee_id: employee.id,
        name: 'Congelados',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able create a new category if employee id is invalid', async () => {
    await expect(
      createCategoryService.execute({
        employee_id: 'invalid-id',
        name: 'Congelados',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
