import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let usersRepository: FakeUsersRepository;
let updateUserAvatarService: UpdateUserAvatarService;
let storageProvider: FakeStorageProvider;

describe('UserAvatar', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    storageProvider = new FakeStorageProvider();
    updateUserAvatarService = new UpdateUserAvatarService(
      usersRepository,
      storageProvider,
    );
  });
  it('Should be able update avatar user', async () => {
    const newUser = await usersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
    const user = await updateUserAvatarService.execute({
      user_id: newUser.id,
      avatarFileName: 'avatarFileName.png',
    });
    expect(user.avatar).not.toBeNull();
    expect(user.avatar).toBe('avatarFileName.png');
  });
  it('Should be able delete old avatar on disk and update a new avatar user', async () => {
    const deleteFile = jest.spyOn(storageProvider, 'deleteFile');
    const newUser = await usersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
    await updateUserAvatarService.execute({
      user_id: newUser.id,
      avatarFileName: 'avatarFileName.png',
    });
    const user = await updateUserAvatarService.execute({
      user_id: newUser.id,
      avatarFileName: 'new-avatar.png',
    });

    expect(user.avatar).toBe('new-avatar.png');
    expect(deleteFile).toHaveBeenCalled();
    expect(deleteFile).toHaveBeenCalledWith('avatarFileName.png');
  });
  it('Should not be able update avatar user if his not logged', async () => {
    await expect(
      updateUserAvatarService.execute({
        user_id: 'invalid-id',
        avatarFileName: 'new-avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
