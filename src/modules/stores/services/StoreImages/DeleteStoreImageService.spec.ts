import Employee from '@modules/employees/infra/typeorm/entities/Employee';
import FakeEmployeesRepository from '@modules/employees/repositories/fakes/FakeEmployeesRepository';
import Store from '@modules/stores/infra/typeorm/entities/Store';
import FakeStoreImagesRepository from '@modules/stores/repositories/fakes/FakeStoreImagesRepository';
import FakeStoresRepository from '@modules/stores/repositories/fakes/FakeStoresRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import DeleteStoreImageService from './DeleteStoreImageService';

let fakeStoreImagesRepository: FakeStoreImagesRepository;
let fakeStoresRepository: FakeStoresRepository;
let fakeEmployeesRepository: FakeEmployeesRepository;
let storageProvider: FakeStorageProvider;
let deleteStoreImageService: DeleteStoreImageService;

let store: Store;
let employee: Employee;

describe('StoreImage Delete', () => {
  beforeEach(async () => {
    fakeStoreImagesRepository = new FakeStoreImagesRepository();
    fakeStoresRepository = new FakeStoresRepository();
    fakeEmployeesRepository = new FakeEmployeesRepository();
    storageProvider = new FakeStorageProvider();
    deleteStoreImageService = new DeleteStoreImageService(
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

  it('Should be able delete a store image', async () => {
    const storeImage = await fakeStoreImagesRepository.create({
      store_id: store.id,
      path: 'path',
      name: 'nome-da-imagem',
    });

    await expect(
      deleteStoreImageService.execute({
        employee_id: employee.id,
        store_image_id: storeImage.id,
      }),
    ).resolves.not.toBeInstanceOf(AppError);
  });
  it('Should not be able delete store image if employee does not have privileges required', async () => {
    employee.responsibility = 'seller';
    const storeImage = await fakeStoreImagesRepository.create({
      store_id: store.id,
      path: 'path',
      name: 'nome-da-imagem',
    });
    await expect(
      deleteStoreImageService.execute({
        employee_id: employee.id,
        store_image_id: storeImage.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able create a new store image if employee id is invalid', async () => {
    const storeImage = await fakeStoreImagesRepository.create({
      store_id: store.id,
      path: 'path',
      name: 'nome-da-imagem',
    });
    await expect(
      deleteStoreImageService.execute({
        employee_id: 'employee-id',
        store_image_id: storeImage.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able create a new store image if store image id is invalid', async () => {
    await expect(
      deleteStoreImageService.execute({
        employee_id: employee.id,
        store_image_id: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
