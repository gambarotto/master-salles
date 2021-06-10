import FakeHashProvider from '@shared/container/providers/hashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeEmployeesRepository from '@modules/employees/repositories/fakes/FakeEmployeesRepository';
import UpdateEmployeeProfileService from './UpdateEmployeeProfileService';

let employeesRepository: FakeEmployeesRepository;
let hashProvider: FakeHashProvider;
let updateEmployeeProfileService: UpdateEmployeeProfileService;

describe('Update EmployeeProfile', () => {
  beforeEach(() => {
    employeesRepository = new FakeEmployeesRepository();
    hashProvider = new FakeHashProvider();
    updateEmployeeProfileService = new UpdateEmployeeProfileService(
      employeesRepository,
      hashProvider,
    );
  });
  it('Should be able update a employee', async () => {
    const employee = await employeesRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
      responsibility: 'admin',
    });
    const updatedEmployee = await updateEmployeeProfileService.execute({
      employee_id: employee.id,
      name: 'Diego editado',
      email: 'diegoeditado@diegoeditado.com',
      old_password: '123456',
      new_password: '1234567',
    });
    expect(updatedEmployee.name).toBe('Diego editado');
    expect(updatedEmployee.email).toBe('diegoeditado@diegoeditado.com');
  });
  it('Should be able update with some fields missing', async () => {
    const employee = await employeesRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
      responsibility: 'admin',
    });
    const updatedEmployee = await updateEmployeeProfileService.execute({
      employee_id: employee.id,
      name: 'Diego editado',
      new_password: '1234567',
    });
    expect(updatedEmployee.name).toBe('Diego editado');
  });
  it('Should not be able update a employee with invalid id', async () => {
    await expect(
      updateEmployeeProfileService.execute({
        employee_id: 'invalid-id',
        name: 'Diego editado',
        email: 'diegoeditado@diegoeditado.com',
        old_password: '123456',
        new_password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able change password if old_password it is incorrect', async () => {
    const employee = await employeesRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
      responsibility: 'admin',
    });

    await expect(
      updateEmployeeProfileService.execute({
        employee_id: employee.id,
        name: 'Diego editado',
        email: 'diegoeditado@diegoeditado.com',
        old_password: 'incorrect-password',
        new_password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able change password if is missing new_password', async () => {
    const employee = await employeesRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
      responsibility: 'admin',
    });

    await expect(
      updateEmployeeProfileService.execute({
        employee_id: employee.id,
        name: 'Diego editado',
        email: 'diegoeditado@diegoeditado.com',
        old_password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able change email if new email already exists', async () => {
    const employee = await employeesRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
      responsibility: 'admin',
    });

    await employeesRepository.create({
      name: 'Diego2',
      email: 'diego2@diego2.com',
      password: '123456',
      responsibility: 'admin',
    });
    await expect(
      updateEmployeeProfileService.execute({
        employee_id: employee.id,
        name: 'Diego editado',
        email: 'diego2@diego2.com',
        old_password: '123456',
        new_password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
