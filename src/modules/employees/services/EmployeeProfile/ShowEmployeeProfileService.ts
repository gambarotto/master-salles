import Employee from '@modules/employees/infra/typeorm/entities/Employee';
import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  employee_id: string;
}

@injectable()
class ShowEmployeeProfileService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
  ) {}

  public async execute({ employee_id }: IRequest): Promise<Employee> {
    const employee = await this.employeesRepository.findById(employee_id);
    if (!employee) {
      throw new AppError('Employee not found');
    }
    return employee;
  }
}
export default ShowEmployeeProfileService;
