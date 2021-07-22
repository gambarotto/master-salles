import AppError from '@shared/errors/AppError';
import FakeUserAdressesRepository from '../../repositories/fakes/FakeUserAdressesRepository';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import GetUserAdressesDefaultService from './GetUserAdressesDefaultService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserAdressesRepository: FakeUserAdressesRepository;
let getUserAdressesDefaultService: GetUserAdressesDefaultService;

describe('CreateUserAddress', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserAdressesRepository = new FakeUserAdressesRepository();
    getUserAdressesDefaultService = new GetUserAdressesDefaultService(
      fakeUsersRepository,
      fakeUserAdressesRepository,
    );
  });
  it('Should be able get default user address', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
    await fakeUserAdressesRepository.create({
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
    await fakeUserAdressesRepository.create({
      user_id: user.id,
      street: 'rua 2',
      number: '34',
      district: 'bairro2',
      city: 'cidade2',
      zip_code: '13132132',
      complement: 'condominio',
      reference_point: 'perto de',
      alias: 'casa',
      default: false,
    });
    const userAdresses = await getUserAdressesDefaultService.execute({
      user_id: user.id,
    });
    expect(userAdresses?.street).toBe('rua um');
  });
  it('Should not be able get default user address with invalid user id', async () => {
    await expect(
      getUserAdressesDefaultService.execute({
        user_id: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
