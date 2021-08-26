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
  it('Should not be able create a new user phone if phone number is greather than 11 or smaller than 10  ', async () => {
    await expect(
      createUserPhoneService.execute({
        user_id: user.id,
        phone_number: '112222255557',
        isDefault: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createUserPhoneService.execute({
        user_id: user.id,
        phone_number: '112222255',
        isDefault: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should be able create a new user phone with isDefault as false', async () => {
    const userPhone = await createUserPhoneService.execute({
      user_id: user.id,
      phone_number: '1133337777',
      isDefault: false,
    });
    expect(userPhone).toHaveProperty('id');
  });
  it('Should registry the last phone_number as default', async () => {
    const uPhone = await fakeUserPhoneRepository.create({
      user_id: user.id,
      phone_number: '1133337778',
      default: true,
    });
    expect(uPhone.default).toBe(true);
    const userPhone = await createUserPhoneService.execute({
      user_id: user.id,
      phone_number: '1133337777',
      isDefault: true,
    });
    expect(uPhone.default).toBe(false);
    expect(userPhone.default).toBe(true);
  });
  it('Should registry the first phone_number as default', async () => {
    const uPhone = await fakeUserPhoneRepository.create({
      user_id: user.id,
      phone_number: '1133337778',
      default: true,
    });
    expect(uPhone.default).toBe(true);
    const userPhone = await createUserPhoneService.execute({
      user_id: user.id,
      phone_number: '1133337777',
      isDefault: false,
    });
    expect(uPhone.default).toBe(true);
    expect(userPhone.default).toBe(false);
  });
});
