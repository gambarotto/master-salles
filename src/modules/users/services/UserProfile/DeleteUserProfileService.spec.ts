import FakeHashProvider from '@shared/container/providers/hashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import DeleteUserProfileService from './DeleteUserProfileService';

let usersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let deleteUserProfileService: DeleteUserProfileService;

describe('Delete UserProfile', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    deleteUserProfileService = new DeleteUserProfileService(
      usersRepository,
      hashProvider,
    );
  });
  it('Should be able delete a user', async () => {
    const user = await usersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });

    await expect(
      deleteUserProfileService.execute({
        userId: user.id,
        password: '123456',
      }),
    ).resolves.not.toBeInstanceOf(AppError);
  });
  it('Should not be able delete a user passing wrong password', async () => {
    const user = await usersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });

    await expect(
      deleteUserProfileService.execute({
        userId: user.id,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able delete a user if missing password', async () => {
    const user = await usersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });

    await expect(
      deleteUserProfileService.execute({
        userId: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able delete a user passing wrong id', async () => {
    await expect(
      deleteUserProfileService.execute({
        userId: 'wrong-id',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
