import AppError from '@shared/errors/AppError';
import FakeUserAdressesRepository from '../../repositories/fakes/FakeUserAdressesRepository';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import SetUserAdressesAsDefaultService from './SetUserAdressesAsDefaultService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserAdressesRepository: FakeUserAdressesRepository;
let setUserAdressesAsDefaultService: SetUserAdressesAsDefaultService;

describe('CreateUserAddress', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserAdressesRepository = new FakeUserAdressesRepository();
    setUserAdressesAsDefaultService = new SetUserAdressesAsDefaultService(
      fakeUsersRepository,
      fakeUserAdressesRepository,
    );
  });
  it('Should be able set as default one user address', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
    const address = await fakeUserAdressesRepository.create({
      user_id: user.id,
      street: 'rua um',
      number: '34',
      district: 'bairro1',
      city: 'cidade1',
      zip_code: '13132132',
      complement: 'condominio',
      reference_point: 'perto de',
      alias: 'casa',
      default: false,
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
    const userAddress = await setUserAdressesAsDefaultService.execute({
      user_id: user.id,
      userAddress_id: address.id,
    });
    expect(userAddress?.default).toBe(true);
  });
  it('Should not be able set as default one user address with invalid user id', async () => {
    await expect(
      setUserAdressesAsDefaultService.execute({
        user_id: 'invalid-id',
        userAddress_id: 'address.id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able set as default one user address with invalid address id', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
    await expect(
      setUserAdressesAsDefaultService.execute({
        user_id: user.id,
        userAddress_id: 'invalid address id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
