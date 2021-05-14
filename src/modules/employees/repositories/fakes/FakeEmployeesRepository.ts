import { v4 } from 'uuid';
import ICreateEmployeeDTO from '@modules/employees/dtos/ICreateEmployeeDTO';
import Employee from '@modules/employees/infra/typeorm/entities/Employee';
import IEmployeesRepository from '../IEmployeesRepository';

class FakeEmployeesRepository implements IEmployeesRepository {
  private employees: Employee[];

  constructor() {
    this.employees = [];
  }

  public async create(data: ICreateEmployeeDTO): Promise<Employee> {
    const employee = new Employee();
    Object.assign(employee, { id: v4() }, data);

    this.employees.push(employee);
    return employee;
  }

  public async update(employee: Employee): Promise<Employee> {
    const findIndex = this.employees.findIndex(
      findEmployee => findEmployee.id === employee.id,
    );
    this.employees[findIndex] = employee;
    return employee;
  }

  // public async delete(user_id: string): Promise<void> {
  //   const userIndex = this.employees.findIndex(user => user.id === user_id);
  //   this.employees.splice(userIndex, 1);
  // }

  public async findById(employee_id: string): Promise<Employee | undefined> {
    const employee = this.employees.find(e => e.id === employee_id);
    return employee;
  }

  public async findByEmail(email: string): Promise<Employee | undefined> {
    const user = this.employees.find(u => u.email === email);
    return user;
  }
}

export default FakeEmployeesRepository;
