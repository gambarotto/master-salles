import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeEmployeesRepository from '../repositories/fakes/FakeEmployeesRepository';
import UpdateEmployeeAvatarService from './UpdateEmployeeAvatarService';

let employeesRepository: FakeEmployeesRepository;
let updateEmployeeAvatarService: UpdateEmployeeAvatarService;
let storageProvider: FakeStorageProvider;

describe('EmployeeAvatar', () => {
  beforeEach(() => {
    employeesRepository = new FakeEmployeesRepository();
    storageProvider = new FakeStorageProvider();
    updateEmployeeAvatarService = new UpdateEmployeeAvatarService(
      employeesRepository,
      storageProvider,
    );
  });
  it('Should be able update avatar employee', async () => {
    const newEmployee = await employeesRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
      responsibility: 'admin',
    });
    const employee = await updateEmployeeAvatarService.execute({
      employee_id: newEmployee.id,
      avatarFileName: 'avatarFileName.png',
    });
    expect(employee.avatar).not.toBeNull();
    expect(employee.avatar).toBe('avatarFileName.png');
  });
  it('Should be able delete old avatar on disk and update a new avatar employee', async () => {
    const deleteFile = jest.spyOn(storageProvider, 'deleteFile');
    const newEmployee = await employeesRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
      responsibility: 'admin',
    });
    await updateEmployeeAvatarService.execute({
      employee_id: newEmployee.id,
      avatarFileName: 'avatarFileName.png',
    });
    const employee = await updateEmployeeAvatarService.execute({
      employee_id: newEmployee.id,
      avatarFileName: 'new-avatar.png',
    });

    expect(employee.avatar).toBe('new-avatar.png');
    expect(deleteFile).toHaveBeenCalled();
    expect(deleteFile).toHaveBeenCalledWith('avatarFileName.png');
  });
  it('Should not be able update avatar employee if his not logged', async () => {
    await expect(
      updateEmployeeAvatarService.execute({
        employee_id: 'invalid-id',
        avatarFileName: 'new-avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
