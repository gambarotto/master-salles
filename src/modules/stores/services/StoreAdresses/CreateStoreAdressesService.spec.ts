import FakeStoreAdressesRepository from '@modules/stores/repositories/fakes/FakeStoreAdressesRepository';
import FakeStoresRepository from '@modules/stores/repositories/fakes/FakeStoresRepository';
import AppError from '@shared/errors/AppError';
import CreateStoreAdressesService from './CreateStoreAdressesService';

let fakeStoreAdressesRepository: FakeStoreAdressesRepository;
let fakeStoresRepository: FakeStoresRepository;
let createStoreAdressesService: CreateStoreAdressesService;

describe('Create Store Address', () => {
  beforeEach(() => {
    fakeStoreAdressesRepository = new FakeStoreAdressesRepository();
    fakeStoresRepository = new FakeStoresRepository();
    createStoreAdressesService = new CreateStoreAdressesService(
      fakeStoreAdressesRepository,
      fakeStoresRepository,
    );
  });
  it('Should be able create a new store address', async () => {
    const store = await fakeStoresRepository.create({
      name: 'Loja de Queijo',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      cnpj: '11.111.111/1111-11',
    });
    const storeAddress = await createStoreAdressesService.execute({
      store_id: store.id,
      street: 'rua da loja',
      number: '888',
      district: 'bairro da loja',
      city: 'jundiai',
      zipCode: '13123123',
      complement: 'prox. ao mercado',
      referencePoint: 'igreja',
      lat: '40.7143528',
      long: '-74.0059731',
    });
    expect(storeAddress).toHaveProperty('id');
  });
  it('Should not be able create a new store address with invalid-store-id', async () => {
    await expect(
      createStoreAdressesService.execute({
        store_id: 'invalid-store-id',
        street: 'rua da loja',
        number: '888',
        district: 'bairro da loja',
        city: 'jundiai',
        zipCode: '13123123',
        complement: 'prox. ao mercado',
        referencePoint: 'igreja',
        lat: '40.7143528',
        long: '-74.0059731',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able create a new store address if already exists a address registred', async () => {
    const store = await fakeStoresRepository.create({
      name: 'Loja de Queijo',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      cnpj: '11.111.111/1111-11',
    });
    await createStoreAdressesService.execute({
      store_id: store.id,
      street: 'rua da loja',
      number: '888',
      district: 'bairro da loja',
      city: 'jundiai',
      zipCode: '13123123',
      complement: 'prox. ao mercado',
      referencePoint: 'igreja',
      lat: '40.7143528',
      long: '-74.0059731',
    });
    await expect(
      createStoreAdressesService.execute({
        store_id: store.id,
        street: 'rua da loja1',
        number: '888',
        district: 'bairro da loja1',
        city: 'jundiai',
        zipCode: '13123123',
        complement: 'prox. ao mercado1',
        referencePoint: 'igreja',
        lat: '40.7143528',
        long: '-74.0059731',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
