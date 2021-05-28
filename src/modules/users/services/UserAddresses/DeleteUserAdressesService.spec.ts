import AppError from '@shared/errors/AppError';
import FakeUserAdressesRepository from '../../repositories/fakes/FakeUserAdressesRepository';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import DeleteUserAdressesService from './DeleteUserAdressesService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserAdressesRepository: FakeUserAdressesRepository;
let deleteUserAdressesService: DeleteUserAdressesService;

describe('Delete UserAdresses', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserAdressesRepository = new FakeUserAdressesRepository();
    deleteUserAdressesService = new DeleteUserAdressesService(
      fakeUsersRepository,
      fakeUserAdressesRepository,
    );
  });
  it('Should be able delete a user address', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
    const userAddress = await fakeUserAdressesRepository.create({
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
    await expect(
      deleteUserAdressesService.execute({
        user_id: user.id,
        address_id: userAddress.id,
      }),
    ).resolves.not.toBeInstanceOf(AppError);
  });
  it('Should not be able delete a user address with user_id/address_id invalids', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
    await expect(
      deleteUserAdressesService.execute({
        user_id: 'invalid-id',
        address_id: 'userAddress.id',
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      deleteUserAdressesService.execute({
        user_id: user.id,
        address_id: 'userAddress.id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it("Should not be able delete another user's user address", async () => {
    const user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
    const user2 = await fakeUsersRepository.create({
      name: 'Diego2',
      email: 'diego2@diego2.com',
      password: '123456',
    });
    const user1Address = await fakeUserAdressesRepository.create({
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
    await expect(
      deleteUserAdressesService.execute({
        user_id: user2.id,
        address_id: user1Address.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
