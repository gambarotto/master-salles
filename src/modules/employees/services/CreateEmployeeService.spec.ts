import FakeHashProvider from '@shared/container/providers/hashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeEmployeesRepository from '../repositories/fakes/FakeEmployeesRepository';
import CreateEmployeeService from './CreateEmployeeService';

let employeesRepository: FakeEmployeesRepository;
let hashProvider: FakeHashProvider;
let createEmployeeService: CreateEmployeeService;

describe('CreateEmployee', () => {
  beforeEach(() => {
    employeesRepository = new FakeEmployeesRepository();
    hashProvider = new FakeHashProvider();
    createEmployeeService = new CreateEmployeeService(
      employeesRepository,
      hashProvider,
    );
  });
  it('Should be able create a new employee', async () => {
    const employee = await createEmployeeService.execute({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
      responsibility: 'admin',
    });
    expect(employee).toHaveProperty('id');
  });
  it('Should not be able create a new employee with an email already existing ', async () => {
    await createEmployeeService.execute({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
      responsibility: 'admin',
    });
    await expect(
      createEmployeeService.execute({
        name: 'Diego2',
        email: 'diego@diego.com',
        password: '123456',
        responsibility: 'admin',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
