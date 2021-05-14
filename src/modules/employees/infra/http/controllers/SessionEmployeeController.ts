import AuthenticateEmployeesService from '@modules/employees/services/AuthenticateEmployeesService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SessionEmployeesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateEmployee = container.resolve(
      AuthenticateEmployeesService,
    );
    const employee = await authenticateEmployee.execute({
      email,
      password,
    });
    return response.json(classToClass(employee));
  }
}

export default SessionEmployeesController;
