import FakeStoreAdressesRepository from '@modules/stores/repositories/fakes/FakeStoreAdressesRepository';
import FakeStoresRepository from '@modules/stores/repositories/fakes/FakeStoresRepository';
import AppError from '@shared/errors/AppError';
import DeleteStoreAdressesService from './DeleteStoreAdressesService';

let fakeStoreAdressesRepository: FakeStoreAdressesRepository;
let fakeStoresRepository: FakeStoresRepository;
let deleteStoreAdressesService: DeleteStoreAdressesService;

describe('Delete Store Address', () => {
  beforeEach(() => {
    fakeStoreAdressesRepository = new FakeStoreAdressesRepository();
    fakeStoresRepository = new FakeStoresRepository();
    deleteStoreAdressesService = new DeleteStoreAdressesService(
      fakeStoreAdressesRepository,
    );
  });
  it('Should be able delete a store address', async () => {
    const store = await fakeStoresRepository.create({
      name: 'Loja de Queijo',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      cnpj: '11.111.111/1111-11',
    });
    const storeAddress = await fakeStoreAdressesRepository.create({
      store_id: store.id,
      street: 'rua da loja',
      number: '888',
      district: 'bairro da loja',
      city: 'jundiai',
      zip_code: '13123123',
      complement: 'prox. ao mercado',
      reference_point: 'igreja',
      lat: Number('40.7143528'),
      long: Number('-74.0059731'),
    });
    await deleteStoreAdressesService.execute({
      store_address_id: storeAddress.id,
    });

    await expect(
      fakeStoreAdressesRepository.findById(storeAddress.id),
    ).resolves.toBe(undefined);
  });
  it('Should not be able delete a store address with invalid-store-address-id', async () => {
    await expect(
      deleteStoreAdressesService.execute({
        store_address_id: 'invalid-store-address-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
