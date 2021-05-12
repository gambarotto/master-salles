import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';

let usersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    authenticateUserService = new AuthenticateUserService(
      usersRepository,
      hashProvider,
    );
  });
  it('Should be able create a new session', async () => {
    await usersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
    const user = await authenticateUserService.execute({
      email: 'diego@diego.com',
      password: '123456',
    });
    expect(user).toHaveProperty('token');
  });
  it('Should not be able create a new session if invalid email', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'invalidemail@invalid.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able create a new session if incorrect password', async () => {
    await usersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
    await expect(
      authenticateUserService.execute({
        email: 'diego@diego.com',
        password: 'invalid-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
