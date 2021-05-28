import AppError from '@shared/errors/AppError';
import FakeUserAdressesRepository from '../../repositories/fakes/FakeUserAdressesRepository';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import ListUserAdressesProvider from './ListUserAdressesProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserAdressesRepository: FakeUserAdressesRepository;
let listUserAdressesProvider: ListUserAdressesProvider;

describe('CreateUserAddress', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserAdressesRepository = new FakeUserAdressesRepository();
    listUserAdressesProvider = new ListUserAdressesProvider(
      fakeUsersRepository,
      fakeUserAdressesRepository,
    );
  });
  it('Should be able list all user adresses', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
    await fakeUserAdressesRepository.create({
      user,
      street: 'rua um',
      number: '34',
      district: 'bairro1',
      city: 'cidade1',
      zip_code: '13132132',
      complement: 'condominio',
      reference_point: 'perto de',
      alias: 'casa',
    });
    await fakeUserAdressesRepository.create({
      user,
      street: 'rua um',
      number: '34',
      district: 'bairro1',
      city: 'cidade1',
      zip_code: '13132132',
      complement: 'condominio',
      reference_point: 'perto de',
      alias: 'casa',
    });
    const listUserAdresses = await listUserAdressesProvider.execute(user.id);
    expect(listUserAdresses).toHaveLength(2);
  });
  it('Should not be able list all user adresses with an invalid id', async () => {
    await expect(
      listUserAdressesProvider.execute('invalid-user-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
