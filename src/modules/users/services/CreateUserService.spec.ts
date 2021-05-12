import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let usersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(usersRepository, hashProvider);
  });
  it('Should be able create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
    expect(user).toHaveProperty('id');
  });
  it('Should not be able create a new user with an email already existing ', async () => {
    await createUserService.execute({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
    await expect(
      createUserService.execute({
        name: 'Diego2',
        email: 'diego@diego.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
