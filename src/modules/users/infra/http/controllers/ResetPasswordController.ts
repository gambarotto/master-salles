import ResetUserPasswordService from '@modules/users/services/UserPasswords/ResetUserPasswordService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { verification_code, password } = request.body;

    const resetPassword = container.resolve(ResetUserPasswordService);
    await resetPassword.execute({
      verification_code,
      password,
    });

    return response.status(204).json();
  }
}
export default ResetPasswordController;
