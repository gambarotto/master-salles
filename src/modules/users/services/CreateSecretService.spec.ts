import FakeCryptoJsProvider from '@shared/container/providers/encryptProvider/fakes/FakeCryptoJsProvider';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateSecretService from './CreateSecretService';

let usersRepository: FakeUsersRepository;
let encryptProvider: FakeCryptoJsProvider;
let createSecretService: CreateSecretService;

let user: User;

describe('Create secret', () => {
  beforeEach(async () => {
    usersRepository = new FakeUsersRepository();
    encryptProvider = new FakeCryptoJsProvider();
    createSecretService = new CreateSecretService(
      usersRepository,
      encryptProvider,
    );
    user = await usersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
  });
  it('Should be able create a new secret', async () => {
    const secret = await createSecretService.execute(user.id);
    expect(secret).toHaveProperty('secret');
  });
  it('Should not be able create a new secret if invalid user id', async () => {
    expect(createSecretService.execute('invalid-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
