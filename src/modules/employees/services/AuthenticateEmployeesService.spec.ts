import FakeHashProvider from '@shared/container/providers/hashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeEmployeesRepository from '../repositories/fakes/FakeEmployeesRepository';
import AuthenticateEmployeesService from './AuthenticateEmployeesService';

let employeesRepository: FakeEmployeesRepository;
let hashProvider: FakeHashProvider;
let authenticateEmployeesService: AuthenticateEmployeesService;

describe('AuthenticateEmployee', () => {
  beforeEach(() => {
    employeesRepository = new FakeEmployeesRepository();
    hashProvider = new FakeHashProvider();
    authenticateEmployeesService = new AuthenticateEmployeesService(
      employeesRepository,
      hashProvider,
    );
  });
  it('Should be able create a new session', async () => {
    await employeesRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
      responsibility: 'admin',
    });
    const employee = await authenticateEmployeesService.execute({
      email: 'diego@diego.com',
      password: '123456',
    });
    expect(employee).toHaveProperty('token');
  });
  it('Should not be able create a new session if invalid email', async () => {
    await expect(
      authenticateEmployeesService.execute({
        email: 'invalidemail@invalid.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able create a new session if incorrect password', async () => {
    await employeesRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
      responsibility: 'admin',
    });
    await expect(
      authenticateEmployeesService.execute({
        email: 'diego@diego.com',
        password: 'invalid-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
