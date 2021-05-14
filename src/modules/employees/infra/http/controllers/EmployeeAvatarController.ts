import UpdateEmployeeAvatarService from '@modules/employees/services/UpdateEmployeeAvatarService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class EmployeeAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateEmployeeAvatarService = container.resolve(
      UpdateEmployeeAvatarService,
    );
    const employee = await updateEmployeeAvatarService.execute({
      employee_id: request.employee.id,
      avatarFileName: request.file.filename,
    });
    return response.json(classToClass(employee));
  }
}

export default EmployeeAvatarController;
