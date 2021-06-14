import Category from '@modules/categories/infra/typeorm/entities/Category';
import Employee from '@modules/employees/infra/typeorm/entities/Employee';
import FakeEmployeesRepository from '@modules/employees/repositories/fakes/FakeEmployeesRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';
import FakeProductPhotosRepository from '@modules/products/repositories/fakes/FakeProductPhotosRepository';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import CreateProductPhotoService from './CreateProductPhotoService';

let fakeProductPhotosRepository: FakeProductPhotosRepository;
let fakeProductsRepository: FakeProductsRepository;
let fakeEmployeesRepository: FakeEmployeesRepository;
let fakeStorageProvider: FakeStorageProvider;
let createProductPhotoService: CreateProductPhotoService;

let employee: Employee;
let product: Product;

describe('ProductPhoto Create', () => {
  beforeEach(async () => {
    fakeProductPhotosRepository = new FakeProductPhotosRepository();
    fakeProductsRepository = new FakeProductsRepository();
    fakeEmployeesRepository = new FakeEmployeesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    createProductPhotoService = new CreateProductPhotoService(
      fakeProductPhotosRepository,
      fakeProductsRepository,
      fakeEmployeesRepository,
      fakeStorageProvider,
    );
    employee = await fakeEmployeesRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
      responsibility: 'admin',
    });
    product = await fakeProductsRepository.create({
      name: 'Produto 1',
      description: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      cost_price: 16.5,
      sale_price: 33.9,
      category_id: [{} as Category],
    });
  });
  it('Should be able create a new product photo', async () => {
    const productPhoto = await createProductPhotoService.execute({
      employee_id: employee.id,
      originalName: 'foto.png',
      nameFile: '7876668990000-foto.jpg',
      product_id: product.id,
    });
    expect(productPhoto).toHaveProperty('id');
  });
  it('Should not be able create a new product photo with product id invalid', async () => {
    await expect(
      createProductPhotoService.execute({
        employee_id: 'invalid-id',
        originalName: 'foto.png',
        nameFile: '7876668990000-foto.jpg',
        product_id: product.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able create a new product photo if employee does not have privileges required', async () => {
    employee.responsibility = 'seller';
    await expect(
      createProductPhotoService.execute({
        employee_id: employee.id,
        originalName: 'foto.png',
        nameFile: '7876668990000-foto.jpg',
        product_id: product.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able create a new product with photo product id invalid', async () => {
    await expect(
      createProductPhotoService.execute({
        employee_id: employee.id,
        originalName: 'foto.png',
        nameFile: '7876668990000-foto.jpg',
        product_id: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
