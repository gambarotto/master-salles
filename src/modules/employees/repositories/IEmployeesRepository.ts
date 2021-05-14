import ICreateEmployeeDTO from '../dtos/ICreateEmployeeDTO';
import Employee from '../infra/typeorm/entities/Employee';

export default interface IEmployeesRepository {
  // findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findById(employee_id: string): Promise<Employee | undefined>;
  findByEmail(email: string): Promise<Employee | undefined>;
  create(data: ICreateEmployeeDTO): Promise<Employee>;
  update(employee: Employee): Promise<Employee>;
  delete(employee_id: string): Promise<void>;
}
