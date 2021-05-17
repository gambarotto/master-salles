import AppError from '@shared/errors/AppError';
import FakeStoresRepository from '../repositories/fakes/FakeStoresRepository';
import CreateStoreService from './CreateStoreService';

let fakeStoresRepository: FakeStoresRepository;
let createStoreService: CreateStoreService;

describe('Create Store', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoresRepository();
    createStoreService = new CreateStoreService(fakeStoresRepository);
  });
  it('Should be able create a new store', async () => {
    const store = await createStoreService.execute({
      name: 'Loja de Queijo',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      cnpj: '11.111.111/1111-11',
    });
    expect(store).toHaveProperty('id');
  });
  it('Should not be able create a new store with same cnpj', async () => {
    await createStoreService.execute({
      name: 'Loja de Queijo',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      cnpj: '11.111.111/1111-11',
    });
    await expect(
      createStoreService.execute({
        name: 'Loja de Queijo',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        cnpj: '11.111.111/1111-11',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
