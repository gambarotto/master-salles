import FakeHashProvider from '@shared/container/providers/hashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeEmployeesRepository from '@modules/employees/repositories/fakes/FakeEmployeesRepository';
import DeleteEmployeeProfileService from './DeleteEmployeeProfileService';

let employeesRepository: FakeEmployeesRepository;
let hashProvider: FakeHashProvider;
let deleteEmployeeProfileService: DeleteEmployeeProfileService;

describe('Delete EmployeeProfile', () => {
  beforeEach(() => {
    employeesRepository = new FakeEmployeesRepository();
    hashProvider = new FakeHashProvider();
    deleteEmployeeProfileService = new DeleteEmployeeProfileService(
      employeesRepository,
      hashProvider,
    );
  });
  it('Should be able delete a employee', async () => {
    const employee = await employeesRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
      responsibility: 'admin',
    });

    await expect(
      deleteEmployeeProfileService.execute({
        employee_id: employee.id,
        password: '123456',
      }),
    ).resolves.not.toBeInstanceOf(AppError);
  });
  it('Should not be able delete a employee passing wrong password', async () => {
    const employee = await employeesRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
      responsibility: 'admin',
    });

    await expect(
      deleteEmployeeProfileService.execute({
        employee_id: employee.id,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able delete a employee if missing password', async () => {
    const employee = await employeesRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
      responsibility: 'admin',
    });

    await expect(
      deleteEmployeeProfileService.execute({
        employee_id: employee.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able delete a employee passing wrong id', async () => {
    await expect(
      deleteEmployeeProfileService.execute({
        employee_id: 'wrong-id',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
