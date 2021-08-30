import Category from '@modules/categories/infra/typeorm/entities/Category';
import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';
import Employee from '@modules/employees/infra/typeorm/entities/Employee';
import FakeEmployeesRepository from '@modules/employees/repositories/fakes/FakeEmployeesRepository';
import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';

let fakeProductsRepository: FakeProductsRepository;
let fakeEmployeesRepository: FakeEmployeesRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let createProductService: CreateProductService;

let employee: Employee;
let category1: Category;
let category2: Category;

describe('Product Create', () => {
  beforeEach(async () => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeEmployeesRepository = new FakeEmployeesRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createProductService = new CreateProductService(
      fakeProductsRepository,
      fakeEmployeesRepository,
      fakeCategoriesRepository,
    );
    employee = await fakeEmployeesRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
      responsibility: 'admin',
    });
    category1 = await fakeCategoriesRepository.create('Congelados');
    category2 = await fakeCategoriesRepository.create('Doces');
  });
  it('Should be able create a new product', async () => {
    const product = await createProductService.execute({
      employee_id: employee.id,
      name: 'Doce de Leite',
      package_quantity: '500g',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      cost_price: 7.9,
      sale_price: 10.0,
      categories_ids: [category1.id, category2.id],
    });
    expect(product).toHaveProperty('id');
  });
  it('Should not be able create a new product with non-exists employee id', async () => {
    await expect(
      createProductService.execute({
        employee_id: 'invalid-id',
        name: 'Doce de Leite',
        package_quantity: '500g',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        cost_price: 7.9,
        sale_price: 10.0,
        categories_ids: [category1.id, category2.id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able create a new product with non-exists category id', async () => {
    await expect(
      createProductService.execute({
        employee_id: employee.id,
        name: 'Doce de Leite',
        package_quantity: '500g',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        cost_price: 7.9,
        sale_price: 10.0,
        categories_ids: ['invalid-category-id', category2.id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able create a new product if employee has no privilegies', async () => {
    employee.responsibility = 'seller';
    await expect(
      createProductService.execute({
        employee_id: employee.id,
        name: 'Doce de Leite',
        package_quantity: '500g',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        cost_price: 7.9,
        sale_price: 10.0,
        categories_ids: [category1.id, category2.id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able create a new product if already exists a product with same name', async () => {
    await createProductService.execute({
      employee_id: employee.id,
      name: 'Doce de Leite',
      package_quantity: '500g',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      cost_price: 7.9,
      sale_price: 10.0,
      categories_ids: [category1.id, category2.id],
    });
    await expect(
      createProductService.execute({
        employee_id: employee.id,
        name: 'Doce de Leite',
        package_quantity: '500g',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        cost_price: 7.9,
        sale_price: 10.0,
        categories_ids: [category1.id, category2.id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
