import Employee from '@modules/employees/infra/typeorm/entities/Employee';
import FakeEmployeesRepository from '@modules/employees/repositories/fakes/FakeEmployeesRepository';
import Store from '@modules/stores/infra/typeorm/entities/Store';
import FakeStoreImagesRepository from '@modules/stores/repositories/fakes/FakeStoreImagesRepository';
import FakeStoresRepository from '@modules/stores/repositories/fakes/FakeStoresRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import CreateStoteImageService from './CreateStoreImageService';

let fakeStoreImagesRepository: FakeStoreImagesRepository;
let fakeStoresRepository: FakeStoresRepository;
let fakeEmployeesRepository: FakeEmployeesRepository;
let storageProvider: FakeStorageProvider;
let createStoreImageService: CreateStoteImageService;

let store: Store;
let employee: Employee;

describe('StoreImage Create', () => {
  beforeEach(async () => {
    fakeStoreImagesRepository = new FakeStoreImagesRepository();
    fakeStoresRepository = new FakeStoresRepository();
    fakeEmployeesRepository = new FakeEmployeesRepository();
    storageProvider = new FakeStorageProvider();
    createStoreImageService = new CreateStoteImageService(
      fakeStoreImagesRepository,
      fakeStoresRepository,
      fakeEmployeesRepository,
      storageProvider,
    );

    store = await fakeStoresRepository.create({
      name: 'Loja 1',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      cnpj: '37280029000184',
    });
    employee = await fakeEmployeesRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
      responsibility: 'admin',
    });
  });

  it('Should be able create a new store image', async () => {
    const storeImage = await createStoreImageService.execute({
      store_id: store.id,
      employee_id: employee.id,
      nameFile: '7876668990000-teste-de-nome.jpg',
    });

    expect(storeImage).toHaveProperty('id');
  });
  it('Should not be able create a new store image if employee id is invalid', async () => {
    await expect(
      createStoreImageService.execute({
        store_id: store.id,
        employee_id: 'invalid-id',
        nameFile: '7876668990000-teste-de-nome.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able create a new store image if employee does not have privileges required', async () => {
    employee.responsibility = 'seller';
    await expect(
      createStoreImageService.execute({
        store_id: store.id,
        employee_id: employee.id,
        nameFile: '7876668990000-teste-de-nome.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able create a new store image if store id is invalid', async () => {
    await expect(
      createStoreImageService.execute({
        store_id: 'invalid-store-id',
        employee_id: employee.id,
        nameFile: '7876668990000-teste-de-nome.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
