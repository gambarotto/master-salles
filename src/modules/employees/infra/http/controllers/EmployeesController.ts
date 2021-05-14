import CreateEmployeeService from '@modules/employees/services/CreateEmployeeService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class EmployeesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, responsibility } = request.body;
    const createEmployee = container.resolve(CreateEmployeeService);
    const employee = await createEmployee.execute({
      name,
      email,
      password,
      responsibility,
    });
    return response.json(classToClass(employee));
  }
}

export default EmployeesController;
