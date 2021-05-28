import FakeStoreAdressesRepository from '@modules/stores/repositories/fakes/FakeStoreAdressesRepository';
import FakeStoresRepository from '@modules/stores/repositories/fakes/FakeStoresRepository';
import AppError from '@shared/errors/AppError';
import UpdateStoreAdressesService from './UpdateStoreAdressesService';

let fakeStoreAdressesRepository: FakeStoreAdressesRepository;
let fakeStoresRepository: FakeStoresRepository;
let updateStoreAdressesService: UpdateStoreAdressesService;

describe('Update Store Address', () => {
  beforeEach(() => {
    fakeStoreAdressesRepository = new FakeStoreAdressesRepository();
    fakeStoresRepository = new FakeStoresRepository();
    updateStoreAdressesService = new UpdateStoreAdressesService(
      fakeStoreAdressesRepository,
    );
  });
  it('Should be able update a store address', async () => {
    const store = await fakeStoresRepository.create({
      name: 'Loja de Queijo',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      cnpj: '11.111.111/1111-11',
    });
    const storeAddress = await fakeStoreAdressesRepository.create({
      storeId: store.id,
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
    const storeAddressUpdated = await updateStoreAdressesService.execute({
      storeId: storeAddress.storeId,
      street: 'rua da loja editada',
      number: '888',
      district: 'bairro da loja editada',
      city: 'jundiai editada',
      zipCode: '13123123',
      complement: 'prox. ao mercado editada',
      referencePoint: 'igreja editada',
      lat: '40.7143528',
      long: '-74.0059731',
    });
    expect(storeAddressUpdated.street).toBe('rua da loja editada');
  });
  it('Should be able update a store address without new data', async () => {
    const store = await fakeStoresRepository.create({
      name: 'Loja de Queijo',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      cnpj: '11.111.111/1111-11',
    });
    const storeAddress = await fakeStoreAdressesRepository.create({
      storeId: store.id,
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
    const storeAddressUpdated = await updateStoreAdressesService.execute({
      storeId: storeAddress.storeId,
    });
    expect(storeAddressUpdated.street).toBe('rua da loja');
  });
  it('Should not be able update a store address with invalid store-address-id', async () => {
    await expect(
      updateStoreAdressesService.execute({
        storeId: 'store-address-id',
        street: 'rua da loja editada',
        number: '888',
        district: 'bairro da loja editada',
        city: 'jundiai editada',
        zipCode: '13123123',
        complement: 'prox. ao mercado editada',
        referencePoint: 'igreja editada',
        lat: '40.7143528',
        long: '-74.0059731',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
