import FakeHashProvider from '@shared/container/providers/hashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import UpdateUserProfileService from './UpdateUserProfileService';

let usersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let updateUserProfileService: UpdateUserProfileService;

describe('Update UserProfile', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    updateUserProfileService = new UpdateUserProfileService(
      usersRepository,
      hashProvider,
    );
  });
  it('Should be able update a user', async () => {
    const user = await usersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
    const updatedUser = await updateUserProfileService.execute({
      userId: user.id,
      name: 'Diego editado',
      email: 'diegoeditado@diegoeditado.com',
      old_password: '123456',
      new_password: '1234567',
    });
    expect(updatedUser.name).toBe('Diego editado');
    expect(updatedUser.email).toBe('diegoeditado@diegoeditado.com');
  });
  it('Should not be able update a user with invalid id', async () => {
    await expect(
      updateUserProfileService.execute({
        userId: 'invalid-id',
        name: 'Diego editado',
        email: 'diegoeditado@diegoeditado.com',
        old_password: '123456',
        new_password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able change password if old_password it is incorrect', async () => {
    const user = await usersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });

    await expect(
      updateUserProfileService.execute({
        userId: user.id,
        name: 'Diego editado',
        email: 'diegoeditado@diegoeditado.com',
        old_password: 'incorrect-password',
        new_password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able change password if is missing new_password', async () => {
    const user = await usersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });

    await expect(
      updateUserProfileService.execute({
        userId: user.id,
        name: 'Diego editado',
        email: 'diegoeditado@diegoeditado.com',
        old_password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able change email if new email already exists', async () => {
    const user = await usersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });

    await usersRepository.create({
      name: 'Diego2',
      email: 'diego2@diego2.com',
      password: '123456',
    });
    await expect(
      updateUserProfileService.execute({
        userId: user.id,
        name: 'Diego editado',
        email: 'diego2@diego2.com',
        old_password: '123456',
        new_password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
