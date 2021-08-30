import Category from '@modules/categories/infra/typeorm/entities/Category';
import Employee from '@modules/employees/infra/typeorm/entities/Employee';
import FakeEmployeesRepository from '@modules/employees/repositories/fakes/FakeEmployeesRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';
import FakeProductPhotosRepository from '@modules/products/repositories/fakes/FakeProductPhotosRepository';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import DeleteProductPhotoService from './DeleteProductPhotoService';

let fakeProductPhotosRepository: FakeProductPhotosRepository;
let fakeEmployeesRepository: FakeEmployeesRepository;
let fakeProductsRepository: FakeProductsRepository;
let fakeStorageProvider: FakeStorageProvider;
let deleteProductPhotoService: DeleteProductPhotoService;

let employee: Employee;
let product: Product;

describe('ProductPhoto Delete', () => {
  beforeEach(async () => {
    fakeProductPhotosRepository = new FakeProductPhotosRepository();
    fakeEmployeesRepository = new FakeEmployeesRepository();
    fakeProductsRepository = new FakeProductsRepository();
    fakeStorageProvider = new FakeStorageProvider();
    deleteProductPhotoService = new DeleteProductPhotoService(
      fakeProductPhotosRepository,
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
      package: '500g',
      description: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      cost_price: 16.5,
      sale_price: 33.9,
      category_id: [{} as Category],
    });
  });
  it('Should be able delete a product photo', async () => {
    const productPhoto = await fakeProductPhotosRepository.create({
      name: 'photo.png',
      path: '6688434655-photo.png',
      product_id: product.id,
    });
    await expect(
      deleteProductPhotoService.execute({
        employee_id: employee.id,
        product_photo_id: productPhoto.id,
      }),
    ).resolves.not.toBeInstanceOf(AppError);
  });
  it('Should not be able delete a product photo if employee id is invalid', async () => {
    await expect(
      deleteProductPhotoService.execute({
        employee_id: 'invalid-id',
        product_photo_id: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able dele a product photo if employee does not have privileges required', async () => {
    employee.responsibility = 'seller';
    const productPhoto = await fakeProductPhotosRepository.create({
      name: 'photo.png',
      path: '6688434655-photo.png',
      product_id: product.id,
    });
    await expect(
      deleteProductPhotoService.execute({
        employee_id: employee.id,
        product_photo_id: productPhoto.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able create a new product with photo product id invalid', async () => {
    await expect(
      deleteProductPhotoService.execute({
        employee_id: employee.id,
        product_photo_id: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
