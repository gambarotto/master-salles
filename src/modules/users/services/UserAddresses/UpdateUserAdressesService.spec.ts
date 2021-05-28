import AppError from '@shared/errors/AppError';
import FakeUserAdressesRepository from '../../repositories/fakes/FakeUserAdressesRepository';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import UpdateUserAdressesService from './UpdateUserAdressesService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserAdressesRepository: FakeUserAdressesRepository;
let updateUserAddress: UpdateUserAdressesService;

describe('updateUserAddress', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserAdressesRepository = new FakeUserAdressesRepository();
    updateUserAddress = new UpdateUserAdressesService(
      fakeUsersRepository,
      fakeUserAdressesRepository,
    );
  });
  it('Should be able update a user address', async () => {
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

    const updatedUserAddress = await updateUserAddress.execute({
      user_id: user.id,
      id: userAddress.id,
      street: 'rua um editado',
      number: '34',
      district: 'bairro1',
      city: 'cidade1',
      zip_code: '13132132',
      complement: 'condominio',
      reference_point: 'perto de',
      alias: 'casa',
    });

    expect(updatedUserAddress.street).toBe('rua um editado');
  });
  it('Should not be able update a user address with invalid user id', async () => {
    await expect(
      updateUserAddress.execute({
        user_id: 'invalid-user-id',
        id: 'ghjjghyt5u8i9ugj',
        street: 'rua um editado',
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
  it('Should not be able update a user address with invalid address id', async () => {
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
    await expect(
      updateUserAddress.execute({
        user_id: user.id,
        id: 'invalid-address-id',
        street: 'rua um editado',
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
  it("Should not be able update another user's user address", async () => {
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
      updateUserAddress.execute({
        user_id: user2.id,
        id: user1Address.id,
        street: 'rua um editado',
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
});
