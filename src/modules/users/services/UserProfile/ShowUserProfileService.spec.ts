import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ShowUserProfileService from './ShowUserProfileService';

let usersRepository: FakeUsersRepository;
let showUserProfileService: ShowUserProfileService;

describe('Show UserProfile', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    showUserProfileService = new ShowUserProfileService(usersRepository);
  });
  it('Should be able get a user', async () => {
    const user = await usersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
    const findUser = await showUserProfileService.execute({ userId: user.id });
    expect(findUser).toHaveProperty('id');
  });
  it('Should not be able get a user with a invalid id', async () => {
    await expect(
      showUserProfileService.execute({ userId: 'invalid-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
