import FakeStoreAdressesRepository from '@modules/stores/repositories/fakes/FakeStoreAdressesRepository';
import FakeStoresRepository from '@modules/stores/repositories/fakes/FakeStoresRepository';
import AppError from '@shared/errors/AppError';
import ShowStoreAdressesService from './ShowStoreAdressesService';

let fakeStoreAdressesRepository: FakeStoreAdressesRepository;
let fakeStoresRepository: FakeStoresRepository;
let showStoreAdressesService: ShowStoreAdressesService;

describe('List Store Address', () => {
  beforeEach(() => {
    fakeStoreAdressesRepository = new FakeStoreAdressesRepository();
    fakeStoresRepository = new FakeStoresRepository();
    showStoreAdressesService = new ShowStoreAdressesService(
      fakeStoreAdressesRepository,
      fakeStoresRepository,
    );
  });
  it('Should be able list a store address', async () => {
    const store = await fakeStoresRepository.create({
      name: 'Loja de Queijo',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      cnpj: '11.111.111/1111-11',
    });
    await fakeStoreAdressesRepository.create({
      storeId: store.id,
      store,
      street: 'rua da loja',
      number: '888',
      district: 'bairro da loja',
      city: 'jundiai',
      zipCode: '13123123',
      complement: 'prox. ao mercado',
      referencePoint: 'igreja',
      lat: Number('40.7143528'),
      long: Number('-74.0059731'),
    });
    const storeAddress = await showStoreAdressesService.execute(store.id);
    expect(storeAddress).toHaveProperty('id');
  });
  it('Should not be able list a store address if not exists some registred', async () => {
    const store = await fakeStoresRepository.create({
      name: 'Loja de Queijo',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      cnpj: '11.111.111/1111-11',
    });
    await expect(
      showStoreAdressesService.execute(store.id),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able list a store address with invalid-store-id', async () => {
    await expect(
      showStoreAdressesService.execute('invalid-store-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
