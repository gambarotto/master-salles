import DeleteEmployeeProfileService from '@modules/employees/services/EmployeeProfile/DeleteEmployeeProfileService';
import ShowEmployeeProfileService from '@modules/employees/services/EmployeeProfile/ShowEmployeeProfileService';
import UpdateEmployeeProfileService from '@modules/employees/services/EmployeeProfile/UpdateEmployeeProfileService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class EmployeeProfilesController {
  public async update(request: Request, response: Response): Promise<Response> {
    const employee_id = request.employee.id;
    const { name, email, old_password, new_password } = request.body;
    const updateEmployeeProfile = container.resolve(
      UpdateEmployeeProfileService,
    );
    const updatedEmployee = await updateEmployeeProfile.execute({
      employee_id,
      name,
      email,
      old_password,
      new_password,
    });
    return response.json(classToClass(updatedEmployee));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const employee_id = request.employee.id;
    const { password } = request.body;

    const deleteProfileEmployee = container.resolve(
      DeleteEmployeeProfileService,
    );
    await deleteProfileEmployee.execute({ employee_id, password });

    return response.json({ message: 'Success on delete employee' });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const employee_id = request.employee.id;

    const showProfileEmployee = container.resolve(ShowEmployeeProfileService);
    const userProfile = await showProfileEmployee.execute({ employee_id });

    return response.json(classToClass(userProfile));
  }
}

export default EmployeeProfilesController;
