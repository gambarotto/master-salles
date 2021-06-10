import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Employee from '../infra/typeorm/entities/Employee';
import IEmployeesRepository from '../repositories/IEmployeesRepository';

interface IRequest {
  employee_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateEmployeeAvatarService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    employee_id,
    avatarFileName,
  }: IRequest): Promise<Employee> {
    const employee = await this.employeesRepository.findById(employee_id);
    if (!employee) {
      throw new AppError('Only authenticate employees can change avatar', 401);
    }
    if (employee.avatar) {
      await this.storageProvider.deleteFile({
        file: employee.avatar,
        moduleName: 'employees',
      });
    }
    const fileName = await this.storageProvider.saveFile({
      file: avatarFileName,
      moduleName: 'employees',
    });
    employee.avatar = fileName;

    await this.employeesRepository.update(employee);
    return employee;
  }
}
export default UpdateEmployeeAvatarService;
