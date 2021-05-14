import ICreateEmployeeDTO from '@modules/employees/dtos/ICreateEmployeeDTO';
import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import { getRepository, Repository } from 'typeorm';
import Employee from '../entities/Employee';

class EmployeesRepository implements IEmployeesRepository {
  private ormRepository: Repository<Employee>;

  constructor() {
    this.ormRepository = getRepository(Employee);
  }

  public async create(data: ICreateEmployeeDTO): Promise<Employee> {
    const employee = this.ormRepository.create(data);
    await this.ormRepository.save(employee);
    return employee;
  }

  public async update(employee: Employee): Promise<Employee> {
    const employeeUpdated = await this.ormRepository.save(employee);
    return employeeUpdated;
  }

  public async delete(employee_id: string): Promise<void> {
    await this.ormRepository.delete(employee_id);
  }

  public async findById(employee_id: string): Promise<Employee | undefined> {
    const employee = await this.ormRepository.findOne(employee_id);
    return employee;
  }

  public async findByEmail(email: string): Promise<Employee | undefined> {
    const employee = await this.ormRepository.findOne({ where: { email } });
    return employee;
  }
}

export default EmployeesRepository;
