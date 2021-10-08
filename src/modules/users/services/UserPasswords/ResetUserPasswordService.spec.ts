import User from '@modules/users/infra/typeorm/entities/User';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '@shared/container/providers/hashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import ResetUserPasswordService from './ResetUserPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokensRepository;
let resetPassword: ResetUserPasswordService;
let fakeHashProvider: FakeHashProvider;

let user: User;
describe('ResetPasswordService', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokenRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPassword = new ResetUserPasswordService(
      fakeUsersRepository,
      fakeUserTokenRepository,
      fakeHashProvider,
    );
    user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
  });
  it('should be able to reset password', async () => {
    const { verification_code } = await fakeUserTokenRepository.generate(
      user.id,
    );

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    await resetPassword.execute({
      verification_code,
      password: '123123',
    });
    const updatedUser = await fakeUsersRepository.findById({
      user_id: user.id,
    });

    expect(updatedUser?.password).toBe('123123');
    expect(generateHash).toHaveBeenCalledWith('123123');
  });
  it('should not be able to reset password a non-existent token', async () => {
    await expect(
      resetPassword.execute({
        verification_code: 100000,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to reset password a non-existent user', async () => {
    const { verification_code } = await fakeUserTokenRepository.generate(
      'non-existent-user',
    );

    await expect(
      resetPassword.execute({
        verification_code,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to reset password if passed more than 2 hours', async () => {
    const { verification_code } = await fakeUserTokenRepository.generate(
      user.id,
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        verification_code,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
