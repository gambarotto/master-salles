import User from '@modules/users/infra/typeorm/entities/User';
import UserPhone from '@modules/users/infra/typeorm/entities/UserPhone';
import FakeUserPhoneRepository from '@modules/users/repositories/fakes/FakeUserPhoneRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import UpdateUserPhoneService from './UpdateUserPhoneService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserPhoneRepository: FakeUserPhoneRepository;
let updateUserPhoneService: UpdateUserPhoneService;

let user: User;
let uPhone: UserPhone;

describe('Update user phone', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserPhoneRepository = new FakeUserPhoneRepository();
    updateUserPhoneService = new UpdateUserPhoneService(
      fakeUsersRepository,
      fakeUserPhoneRepository,
    );

    user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
    uPhone = await fakeUserPhoneRepository.create({
      user_id: user.id,
      phone_number: '1133337778',
      default: true,
    });
  });
  it('Should be able update a user phone', async () => {
    const userPhone = await updateUserPhoneService.execute({
      user_id: user.id,
      phone_number_id: uPhone.id,
      phone_number: '1133337779',
      isDefault: true,
    });
    expect(userPhone.phone_number).toBe('1133337779');
  });
  it('Should not be able update a user phone with a user id invalid ', async () => {
    await expect(
      updateUserPhoneService.execute({
        user_id: 'invalid-id',
        phone_number_id: uPhone.id,
        phone_number: '11222225555',
        isDefault: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able update a user phone if phone number is greather than 11 or smaller than 10', async () => {
    await expect(
      updateUserPhoneService.execute({
        user_id: user.id,
        phone_number_id: uPhone.id,
        phone_number: '112222255559',
        isDefault: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      updateUserPhoneService.execute({
        user_id: user.id,
        phone_number_id: uPhone.id,
        phone_number: '112222255',
        isDefault: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able update a user phone with a user phone id invalid ', async () => {
    await expect(
      updateUserPhoneService.execute({
        user_id: user.id,
        phone_number_id: 'invalid-id',
        phone_number: '11222225555',
        isDefault: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able update a user phone with a user id invalid ', async () => {
    await expect(
      updateUserPhoneService.execute({
        user_id: 'invalid-id',
        phone_number_id: uPhone.id,
        phone_number: '11222225555',
        isDefault: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  describe('Should be able update a user phone with more than 2 registries on db', () => {
    it('isDefault: true / phoneDB: false', async () => {
      uPhone.default = false;
      const uPhone2 = await fakeUserPhoneRepository.create({
        user_id: user.id,
        phone_number: '1133337773',
        default: true,
      });
      expect(uPhone2.default).toBe(true);
      const userPhone = await updateUserPhoneService.execute({
        user_id: user.id,
        phone_number_id: uPhone.id,
        phone_number: '1133337779',
        isDefault: true,
      });
      expect(userPhone.phone_number).toBe('1133337779');
      expect(userPhone.default).toBe(true);
      expect(uPhone2.default).toBe(false);
    });
    it('isDefault: true / phoneDB: true', async () => {
      const uPhone2 = await fakeUserPhoneRepository.create({
        user_id: user.id,
        phone_number: '1133337773',
        default: false,
      });
      expect(uPhone2.default).toBe(false);
      const userPhone = await updateUserPhoneService.execute({
        user_id: user.id,
        phone_number_id: uPhone.id,
        phone_number: '1133337779',
        isDefault: true,
      });
      expect(userPhone.phone_number).toBe('1133337779');
      expect(userPhone.default).toBe(true);
      expect(uPhone2.default).toBe(false);
    });
    it('isDefault: false / phoneDB: true', async () => {
      const uPhone2 = await fakeUserPhoneRepository.create({
        user_id: user.id,
        phone_number: '1133337773',
        default: false,
      });
      expect(uPhone2.default).toBe(false);
      const userPhone = await updateUserPhoneService.execute({
        user_id: user.id,
        phone_number_id: uPhone.id,
        phone_number: '1133337779',
        isDefault: false,
      });
      expect(userPhone.phone_number).toBe('1133337779');
      expect(userPhone.default).toBe(false);
      expect(uPhone2.default).toBe(true);
    });
    it('isDefault: false / phoneDB: false', async () => {
      uPhone.default = false;
      const uPhone2 = await fakeUserPhoneRepository.create({
        user_id: user.id,
        phone_number: '1133337773',
        default: false,
      });
      expect(uPhone2.default).toBe(false);
      const userPhone = await updateUserPhoneService.execute({
        user_id: user.id,
        phone_number_id: uPhone.id,
        phone_number: '1133337779',
        isDefault: false,
      });
      expect(userPhone.phone_number).toBe('1133337779');
      expect(userPhone.default).toBe(false);
      expect(uPhone2.default).toBe(false);
    });
  });
  describe('Should be able update a user phone with only one registred on db', () => {
    it('isDefault: true / phoneDB: false', async () => {
      uPhone.default = false;
      const userPhone = await updateUserPhoneService.execute({
        user_id: user.id,
        phone_number_id: uPhone.id,
        phone_number: '1133337779',
        isDefault: true,
      });
      expect(userPhone.phone_number).toBe('1133337779');
      expect(userPhone.default).toBe(true);
    });
    // it('isDefault: true / phoneDB: true', async () => {
    //   const uPhone2 = await fakeUserPhoneRepository.create({
    //     user_id: user.id,
    //     phone_number: '1133337773',
    //     default: false,
    //   });
    //   expect(uPhone2.default).toBe(false);
    //   const userPhone = await updateUserPhoneService.execute({
    //     user_id: user.id,
    //     phone_number_id: uPhone.id,
    //     phone_number: '1133337779',
    //     isDefault: true,
    //   });
    //   expect(userPhone.phone_number).toBe('1133337779');
    //   expect(userPhone.default).toBe(true);
    //   expect(uPhone2.default).toBe(false);
    // });
    // it('isDefault: false / phoneDB: true', async () => {
    //   const uPhone2 = await fakeUserPhoneRepository.create({
    //     user_id: user.id,
    //     phone_number: '1133337773',
    //     default: false,
    //   });
    //   expect(uPhone2.default).toBe(false);
    //   const userPhone = await updateUserPhoneService.execute({
    //     user_id: user.id,
    //     phone_number_id: uPhone.id,
    //     phone_number: '1133337779',
    //     isDefault: false,
    //   });
    //   expect(userPhone.phone_number).toBe('1133337779');
    //   expect(userPhone.default).toBe(false);
    //   expect(uPhone2.default).toBe(true);
    // });
    // it('isDefault: false / phoneDB: false', async () => {
    //   uPhone.default = false;
    //   const uPhone2 = await fakeUserPhoneRepository.create({
    //     user_id: user.id,
    //     phone_number: '1133337773',
    //     default: false,
    //   });
    //   expect(uPhone2.default).toBe(false);
    //   const userPhone = await updateUserPhoneService.execute({
    //     user_id: user.id,
    //     phone_number_id: uPhone.id,
    //     phone_number: '1133337779',
    //     isDefault: false,
    //   });
    //   expect(userPhone.phone_number).toBe('1133337779');
    //   expect(userPhone.default).toBe(false);
    //   expect(uPhone2.default).toBe(false);
    // });
  });
});
