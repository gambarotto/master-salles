import VerifyCodeResetPasswordService from '@modules/users/services/UserPasswords/VerifyCodeResetPasswordService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class VerifyResetCodeController {
  public async verify(request: Request, response: Response): Promise<Response> {
    const { verification_code } = request.params;

    const verifyCodeResetPassword = container.resolve(
      VerifyCodeResetPasswordService,
    );
    await verifyCodeResetPassword.execute({
      verification_code: parseInt(verification_code, 10),
    });

    return response.status(204).json();
  }
}
export default VerifyResetCodeController;
