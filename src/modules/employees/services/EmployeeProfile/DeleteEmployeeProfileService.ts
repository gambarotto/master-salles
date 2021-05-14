import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';

interface IRequest {
  employee_id: string;
  password?: string;
}

@injectable()
class DeleteEmployeeProfileService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ employee_id, password }: IRequest): Promise<void> {
    const employee = await this.employeesRepository.findById(employee_id);
    if (!employee) {
      throw new AppError('Employee not found');
    }
    if (!password) {
      throw new AppError('Inform your password');
    }
    const matchedPassword = await this.hashProvider.compareHash(
      password,
      employee.password,
    );
    if (!matchedPassword) {
      throw new AppError('Password do not match');
    }
    await this.employeesRepository.delete(employee_id);
  }
}
export default DeleteEmployeeProfileService;
