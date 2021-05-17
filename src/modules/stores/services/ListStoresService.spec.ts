import FakeStoresRepository from '../repositories/fakes/FakeStoresRepository';
import ListStoreService from './ListStoresService';

let fakeStoresRepository: FakeStoresRepository;
let listStoresService: ListStoreService;

describe('List all Stores', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoresRepository();
    listStoresService = new ListStoreService(fakeStoresRepository);
  });
  it('Should be able list all stores', async () => {
    await fakeStoresRepository.create({
      name: 'Loja de Queijo',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      cnpj: '11.111.111/1111-11',
    });
    const stores = await listStoresService.execute();
    expect(stores).toHaveLength(1);
  });
});
