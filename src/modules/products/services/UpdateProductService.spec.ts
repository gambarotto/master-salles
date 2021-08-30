import Category from '@modules/categories/infra/typeorm/entities/Category';
import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';
import Employee from '@modules/employees/infra/typeorm/entities/Employee';
import FakeEmployeesRepository from '@modules/employees/repositories/fakes/FakeEmployeesRepository';
import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import UpdateProductService from './UpdateProductService';

let fakeProductsRepository: FakeProductsRepository;
let fakeEmployeesRepository: FakeEmployeesRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let updateProductService: UpdateProductService;

let employee: Employee;
let category1: Category;
let category2: Category;

describe('Product Update', () => {
  beforeEach(async () => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeEmployeesRepository = new FakeEmployeesRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();
    updateProductService = new UpdateProductService(
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
  it('Should be able update a product', async () => {
    const category3 = await fakeCategoriesRepository.create('Amargo');

    const product = await fakeProductsRepository.create({
      name: 'Doce de Leite',
      package: '500g',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      cost_price: 7.9,
      sale_price: 10.0,
      category_id: [category1, category2],
    });
    const productUpdated = await updateProductService.execute({
      employee_id: employee.id,
      product_id: product.id,
      name: 'Leite 2',
      categories_ids: [category3.id, category1.id],
    });
    expect(productUpdated.category_id).toHaveLength(2);
    expect(productUpdated.category_id[0].id).toBe(category3.id);
  });
  it('Should be able update a product even if some field are not informed', async () => {
    const product = await fakeProductsRepository.create({
      name: 'Doce de Leite',
      package: '500g',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      cost_price: 7.9,
      sale_price: 10.0,
      category_id: [category1, category2],
    });
    const productUpdated = await updateProductService.execute({
      employee_id: employee.id,
      product_id: product.id,
    });
    expect(productUpdated.category_id).toHaveLength(2);
  });
  it('Should not be able update a product if the employee does not have privilegies to do', async () => {
    const category3 = await fakeCategoriesRepository.create('Amargo');
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
      updateProductService.execute({
        employee_id: employee.id,
        product_id: product.id,
        name: 'Leite 2',
        categories_ids: [category3.id, category1.id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able update a product if one id category is invalid', async () => {
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
      updateProductService.execute({
        employee_id: employee.id,
        product_id: product.id,
        name: 'Leite 2',
        categories_ids: [category1.id, 'invalid-id'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able update a product if employee id is invalid', async () => {
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
      updateProductService.execute({
        employee_id: 'invalid-id',
        product_id: product.id,
        name: 'Leite 2',
        categories_ids: [category1.id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able update a product if product id is invalid', async () => {
    await expect(
      updateProductService.execute({
        employee_id: employee.id,
        product_id: 'invalid-id',
        name: 'Leite 2',
        categories_ids: [category1.id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
