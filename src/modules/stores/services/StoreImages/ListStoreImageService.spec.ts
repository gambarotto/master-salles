import Store from '@modules/stores/infra/typeorm/entities/Store';
import FakeStoreImagesRepository from '@modules/stores/repositories/fakes/FakeStoreImagesRepository';
import FakeStoresRepository from '@modules/stores/repositories/fakes/FakeStoresRepository';
import AppError from '@shared/errors/AppError';
import ListStoreImageService from './ListStoreImageService';

let fakeStoreImagesRepository: FakeStoreImagesRepository;
let fakeStoresRepository: FakeStoresRepository;
let listStoreImageService: ListStoreImageService;

let store: Store;

describe('StoreImage List', () => {
  beforeEach(async () => {
    fakeStoreImagesRepository = new FakeStoreImagesRepository();
    fakeStoresRepository = new FakeStoresRepository();
    listStoreImageService = new ListStoreImageService(
      fakeStoreImagesRepository,
      fakeStoresRepository,
    );

    store = await fakeStoresRepository.create({
      name: 'Loja 1',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      cnpj: '37280029000184',
    });
  });

  it('Should be able list store images', async () => {
    await fakeStoreImagesRepository.create({
      store_id: store.id,
      path: 'path',
      name: 'nome-da-imagem',
    });
    const storeImages = await listStoreImageService.execute(store.id);
    expect(storeImages).toHaveLength(1);
  });
  it('Should not be able list store images if store id is invalid', async () => {
    await fakeStoreImagesRepository.create({
      store_id: store.id,
      path: 'path',
      name: 'nome-da-imagem',
    });
    await expect(
      listStoreImageService.execute('invalid-store-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
