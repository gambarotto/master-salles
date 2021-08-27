import User from '@modules/users/infra/typeorm/entities/User';
import UserPhone from '@modules/users/infra/typeorm/entities/UserPhone';
import FakeUserPhoneRepository from '@modules/users/repositories/fakes/FakeUserPhoneRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import DeleteUserPhoneService from './DeleteUserPhoneService';

let fakeUserPhoneRepository: FakeUserPhoneRepository;
let fakeUsersRepository: FakeUsersRepository;
let deleteUserPhoneService: DeleteUserPhoneService;

let user: User;
let uPhone: UserPhone;

describe('Delete user phone', () => {
  beforeEach(async () => {
    fakeUserPhoneRepository = new FakeUserPhoneRepository();
    fakeUsersRepository = new FakeUsersRepository();
    deleteUserPhoneService = new DeleteUserPhoneService(
      fakeUserPhoneRepository,
    );

    user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
    uPhone = await fakeUserPhoneRepository.create({
      user_id: user.id,
      phone_number: '11988885555',
      default: true,
    });
  });
  it('Should be able delete a phone number from an user', async () => {
    await fakeUserPhoneRepository.create({
      user_id: user.id,
      phone_number: '11988885555',
      default: true,
    });
    await deleteUserPhoneService.execute({
      user_id: user.id,
      phone_number_id: uPhone.id,
    });
    const userPhones = await fakeUserPhoneRepository.findAllByUser(user.id);
    expect(userPhones).toHaveLength(1);
  });
  it('Should not be able delete a phone number from an user if user id or phone number id is invalids', async () => {
    await expect(
      deleteUserPhoneService.execute({
        user_id: 'invalid-id',
        phone_number_id: uPhone.id,
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      deleteUserPhoneService.execute({
        user_id: user.id,
        phone_number_id: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
