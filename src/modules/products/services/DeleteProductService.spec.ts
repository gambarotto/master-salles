import Category from '@modules/categories/infra/typeorm/entities/Category';
import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';
import Employee from '@modules/employees/infra/typeorm/entities/Employee';
import FakeEmployeesRepository from '@modules/employees/repositories/fakes/FakeEmployeesRepository';
import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import DeleteProductService from './DeleteProductService';

let fakeProductsRepository: FakeProductsRepository;
let fakeEmployeesRepository: FakeEmployeesRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let deleteProductService: DeleteProductService;

let employee: Employee;
let category1: Category;
let category2: Category;

describe('Product Create', () => {
  beforeEach(async () => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeEmployeesRepository = new FakeEmployeesRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();
    deleteProductService = new DeleteProductService(
      fakeProductsRepository,
      fakeEmployeesRepository,
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
  it('Should be able delete a product', async () => {
    const product = await fakeProductsRepository.create({
      name: 'Doce de Leite',
      package: '500g',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      cost_price: 7.9,
      sale_price: 10.0,
      category_id: [category1, category2],
    });
    await deleteProductService.execute({
      employee_id: employee.id,
      product_id: product.id,
    });
    const products = await fakeProductsRepository.findAllProducts();
    expect(products).toHaveLength(0);
  });
  it('Should not be able delete a product if the employee does not have privilegies to do', async () => {
    employee.responsibility = 'seller';
    const product = await fakeProductsRepository.create({
      name: 'Doce de Leite',
      package: '500g',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      cost_price: 7.9,
      sale_price: 10.0,
      category_id: [category1, category2],
    });
    await expect(
      deleteProductService.execute({
        employee_id: employee.id,
        product_id: product.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able delete a product if the employee id is invalid', async () => {
    const product = await fakeProductsRepository.create({
      name: 'Doce de Leite',
      package: '500g',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      cost_price: 7.9,
      sale_price: 10.0,
      category_id: [category1, category2],
    });
    await expect(
      deleteProductService.execute({
        employee_id: 'invalid-id',
        product_id: product.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able delete a product if the product id is invalid', async () => {
    await expect(
      deleteProductService.execute({
        employee_id: employee.id,
        product_id: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
