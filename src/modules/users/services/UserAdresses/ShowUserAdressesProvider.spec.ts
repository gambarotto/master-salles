import User from '@modules/users/infra/typeorm/entities/User';
import UserAddress from '@modules/users/infra/typeorm/entities/UserAddress';
import AppError from '@shared/errors/AppError';
import FakeUserAdressesRepository from '../../repositories/fakes/FakeUserAdressesRepository';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import ShowUserAdressesService from './ShowUserAdressesService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserAdressesRepository: FakeUserAdressesRepository;
let showUserAdressesProvider: ShowUserAdressesService;

let user: User;
let address: UserAddress;
describe('Show User Address', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserAdressesRepository = new FakeUserAdressesRepository();
    showUserAdressesProvider = new ShowUserAdressesService(
      fakeUsersRepository,
      fakeUserAdressesRepository,
    );
    user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
    address = await fakeUserAdressesRepository.create({
      user_id: user.id,
      street: 'rua um',
      number: '34',
      district: 'bairro1',
      city: 'cidade1',
      zip_code: '13132132',
      complement: 'condominio',
      reference_point: 'perto de',
      alias: 'casa',
      default: true,
    });
  });
  it('Should be able show a user adresses', async () => {
    const userAddress = await showUserAdressesProvider.execute({
      user_id: user.id,
      address_id: address.id,
    });

    expect(userAddress?.street).toBe('rua um');
  });
  it('Should not be able show a user adresses with user invalid id', async () => {
    await expect(
      showUserAdressesProvider.execute({
        user_id: 'invalid-user-id',
        address_id: address.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able show a user adresses with address invalid id', async () => {
    await expect(
      showUserAdressesProvider.execute({
        user_id: user.id,
        address_id: 'invalid-id',
      }),
    ).resolves.toBe(undefined);
  });
});
