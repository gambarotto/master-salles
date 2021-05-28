import AppError from '@shared/errors/AppError';
import FakeStoresRepository from '../repositories/fakes/FakeStoresRepository';
import DeleteStoreService from './DeleteStoreService';

let fakeStoresRepository: FakeStoresRepository;
let deleteStoreService: DeleteStoreService;

describe('List all Stores', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoresRepository();
    deleteStoreService = new DeleteStoreService(fakeStoresRepository);
  });
  it('Should be able delete a store', async () => {
    await fakeStoresRepository.create({
      name: 'Loja de Queijo',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      cnpj: '11.111.111/1111-11',
    });
    const store = await fakeStoresRepository.create({
      name: 'Loja de Queijo',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      cnpj: '21.111.111/1111-11',
    });
    await deleteStoreService.execute({ store_id: store.id });
    const stores = await fakeStoresRepository.findAllStores();
    expect(stores).toHaveLength(1);
  });
  it('Should not be able delete a store with invalid store id', async () => {
    await expect(
      deleteStoreService.execute({ store_id: 'invalid-store-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
