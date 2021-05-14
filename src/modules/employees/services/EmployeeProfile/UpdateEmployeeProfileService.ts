import User from '@modules/users/infra/typeorm/entities/User';
import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';

interface IRequest {
  employee_id: string;
  name?: string;
  email?: string;
  old_password?: string;
  new_password?: string;
}

@injectable()
class UpdateEmployeeProfileService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    employee_id,
    name,
    email,
    old_password,
    new_password,
  }: IRequest): Promise<User> {
    const employee = await this.employeesRepository.findById(employee_id);
    if (!employee) {
      throw new AppError('Employee not found');
    }
    if (email && email !== employee.email) {
      const alreadyExistsEmail = await this.employeesRepository.findByEmail(
        email,
      );
      if (alreadyExistsEmail) {
        throw new AppError('Email already exists');
      }
    }
    if (old_password) {
      const matchedPassword = await this.hashProvider.compareHash(
        old_password,
        employee.password,
      );
      if (!matchedPassword) {
        throw new AppError('Password do not match');
      }
      if (!new_password) {
        throw new AppError('New Password is missing');
      }
      const passwordHashed = await this.hashProvider.generateHash(new_password);
      employee.password = passwordHashed;
    }
    Object.assign(employee, { name, email });
    const updatedEmployee = await this.employeesRepository.update(employee);
    return updatedEmployee;
  }
}
export default UpdateEmployeeProfileService;
