import Employee from '@modules/employees/infra/typeorm/entities/Employee';
import FakeEmployeesRepository from '@modules/employees/repositories/fakes/FakeEmployeesRepository';
import FakeCompressImageProvider from '@shared/container/providers/CompressImageProvider/fakes/FakeCompressImageProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import Category from '../infra/typeorm/entities/Category';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import UpdateCategoryImageService from './UpdateCategoryImageService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let fakeEmployeesRepository: FakeEmployeesRepository;
let updateCategoryImageService: UpdateCategoryImageService;
let storageProvider: FakeStorageProvider;
let compressImageProvider: FakeCompressImageProvider;

let employee: Employee;
let category: Category;

describe('Category Update', () => {
  beforeEach(async () => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeEmployeesRepository = new FakeEmployeesRepository();
    storageProvider = new FakeStorageProvider();
    compressImageProvider = new FakeCompressImageProvider();

    updateCategoryImageService = new UpdateCategoryImageService(
      fakeEmployeesRepository,
      fakeCategoriesRepository,
      storageProvider,
      compressImageProvider,
    );
    employee = await fakeEmployeesRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
      responsibility: 'admin',
    });
    category = await fakeCategoriesRepository.create('Congelados');
  });

  it('Should be able update image from category', async () => {
    const pathImage = await storageProvider.saveFile({
      file: 'image.png',
      moduleName: 'categories',
    });
    const categoryUpdated = await updateCategoryImageService.execute({
      employee_id: employee.id,
      category_id: category.id,
      categoryFileName: pathImage,
    });
    expect(categoryUpdated).toHaveProperty('id');
    expect(categoryUpdated.image).toBe(pathImage);
  });
  it('Should be able update image from category if already exists an image saved', async () => {
    const pathImage = await storageProvider.saveFile({
      file: 'image.png',
      moduleName: 'categories',
    });
    await updateCategoryImageService.execute({
      employee_id: employee.id,
      category_id: category.id,
      categoryFileName: pathImage,
    });
    const categoryUpdated = await updateCategoryImageService.execute({
      employee_id: employee.id,
      category_id: category.id,
      categoryFileName: pathImage,
    });
    expect(categoryUpdated).toHaveProperty('id');
    expect(categoryUpdated.image).toBe(pathImage);
  });
  it('Should not be able update a category with invalid employee id', async () => {
    await expect(
      updateCategoryImageService.execute({
        employee_id: 'invalid-id',
        category_id: category.id,
        categoryFileName: 'image.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able update image from category if employee does not have privilegies', async () => {
    employee.responsibility = 'seller';

    await expect(
      updateCategoryImageService.execute({
        employee_id: employee.id,
        category_id: category.id,
        categoryFileName: 'image.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able update image from category if category id is invalid', async () => {
    await expect(
      updateCategoryImageService.execute({
        employee_id: employee.id,
        category_id: 'invalid-id',
        categoryFileName: 'image.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
