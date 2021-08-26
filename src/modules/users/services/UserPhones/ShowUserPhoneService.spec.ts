import User from '@modules/users/infra/typeorm/entities/User';
import FakeUserPhoneRepository from '@modules/users/repositories/fakes/FakeUserPhoneRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ShowUserPhoneService from './ShowUserPhoneService';

let fakeUserPhoneRepository: FakeUserPhoneRepository;
let fakeUsersRepository: FakeUsersRepository;
let showUserPhoneService: ShowUserPhoneService;

let user: User;
describe('Show user phone', () => {
  beforeEach(async () => {
    fakeUserPhoneRepository = new FakeUserPhoneRepository();
    fakeUsersRepository = new FakeUsersRepository();
    showUserPhoneService = new ShowUserPhoneService(fakeUserPhoneRepository);

    user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
  });
  it('Should be able show a phone number from an user', async () => {
    const uPhone = await fakeUserPhoneRepository.create({
      user_id: user.id,
      phone_number: '11988885555',
      default: true,
    });
    const userPhone = await showUserPhoneService.execute({
      user_id: user.id,
      phone_number_id: uPhone.id,
    });
    expect(userPhone).toHaveProperty('id');
  });
  it('Should not be able show a phone number from an user if user id or phone number id is invalids', async () => {
    const uPhone = await fakeUserPhoneRepository.create({
      user_id: user.id,
      phone_number: '11988885555',
      default: true,
    });

    await expect(
      showUserPhoneService.execute({
        user_id: 'invalid-id',
        phone_number_id: uPhone.id,
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      showUserPhoneService.execute({
        user_id: user.id,
        phone_number_id: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
