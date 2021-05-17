import AppError from '@shared/errors/AppError';
import FakeStoresRepository from '../repositories/fakes/FakeStoresRepository';
import UpdateStoreService from './UpdateStoreService';

let fakeStoresRepository: FakeStoresRepository;
let updateStoreService: UpdateStoreService;

describe('Update Store', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoresRepository();
    updateStoreService = new UpdateStoreService(fakeStoresRepository);
  });
  it('Should be able update a store', async () => {
    const store = await fakeStoresRepository.create({
      name: 'Loja de Queijo',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      cnpj: '11.111.111/1111-11',
    });
    const storeUpdated = await updateStoreService.execute({
      store_id: store.id,
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      cnpj: '21.111.111/1111-11',
    });

    expect(storeUpdated.cnpj).toBe('21.111.111/1111-11');
    expect(storeUpdated.name).toBe('Loja de Queijo');
  });
  it('Should not be able update a store with invalid store id', async () => {
    await expect(
      updateStoreService.execute({
        store_id: 'invalid-store-id',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        cnpj: '21.111.111/1111-11',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able update a store with a already existent cnpj', async () => {
    const store = await fakeStoresRepository.create({
      name: 'Loja de Queijo',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      cnpj: '11.111.111/1111-11',
    });
    await expect(
      updateStoreService.execute({
        store_id: store.id,
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        cnpj: '11.111.111/1111-11',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
