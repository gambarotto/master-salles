import FakeHashProvider from '../../../shared/container/providers/hashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserWithFacebookService from './CreateUserWithFacebookService';

let usersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let createUserFacebookService: CreateUserWithFacebookService;

describe('CreateUserWithFacebook', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createUserFacebookService = new CreateUserWithFacebookService(
      usersRepository,
      hashProvider,
    );
  });
  it('Should be able create a new user', async () => {
    const user = await createUserFacebookService.execute({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
      avatar_social_media: 'url',
    });
    expect(user).toHaveProperty('id');
  });
  it('Should be able to recover a user if he is already registered', async () => {
    await createUserFacebookService.execute({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
      avatar_social_media: 'url',
    });
    const user = await createUserFacebookService.execute({
      name: 'Diego2',
      email: 'diego@diego.com',
      password: '123456',
      avatar_social_media: 'url',
    });
    expect(user.email).toBe('diego@diego.com');
  });
});
