import User from '@modules/users/infra/typeorm/entities/User';
import FakeUserPhoneRepository from '@modules/users/repositories/fakes/FakeUserPhoneRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import CreateUserPhoneService from './CreateUserPhoneService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserPhoneRepository: FakeUserPhoneRepository;
let createUserPhoneService: CreateUserPhoneService;

let user: User;

describe('CreateUser', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserPhoneRepository = new FakeUserPhoneRepository();
    createUserPhoneService = new CreateUserPhoneService(
      fakeUsersRepository,
      fakeUserPhoneRepository,
    );

    user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
  });
  it('Should be able create a new user phone', async () => {
    const userPhone = await createUserPhoneService.execute({
      user_id: user.id,
      phone_number: '1133337777',
      isDefault: true,
    });
    expect(userPhone).toHaveProperty('id');
  });
  it('Should not be able create a new user with a user id invalid ', async () => {
    await expect(
      createUserPhoneService.execute({
        user_id: 'invalid-id',
        phone_number: '11222225555',
        isDefault: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
