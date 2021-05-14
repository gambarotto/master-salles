import AppError from '@shared/errors/AppError';
import FakeUserAdressesRepository from '../../repositories/fakes/FakeUserAdressesRepository';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import CreateUserAdressessService from './CreateUserAdressesService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserAdressesRepository: FakeUserAdressesRepository;
let createUserAddress: CreateUserAdressessService;

describe('CreateUserAddress', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserAdressesRepository = new FakeUserAdressesRepository();
    createUserAddress = new CreateUserAdressessService(
      fakeUsersRepository,
      fakeUserAdressesRepository,
    );
  });
  it('Should be able create a new user address', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
    const userAddress = await createUserAddress.execute({
      user_id: user.id,
      street: 'rua um',
      number: '34',
      district: 'bairro1',
      city: 'cidade1',
      zip_code: '13132132',
      complement: 'condominio',
      reference_point: 'perto de',
      alias: 'casa',
    });
    expect(userAddress).toHaveProperty('id');
  });
  it('Should not be able create a new user address with a invalid id', async () => {
    await expect(
      createUserAddress.execute({
        user_id: 'invalid id',
        street: 'rua um',
        number: '34',
        district: 'bairro1',
        city: 'cidade1',
        zip_code: '13132132',
        complement: 'condominio',
        reference_point: 'perto de',
        alias: 'casa',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able create a new user address without required properties', async () => {
    await expect(
      createUserAddress.execute({
        user_id: '',
        street: '',
        number: '34',
        district: 'bairro1',
        city: '',
        zip_code: '',
        complement: 'condominio',
        reference_point: 'perto de',
        alias: 'casa',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
