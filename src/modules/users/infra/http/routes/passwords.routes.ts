import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';
import VerifyResetCodeController from '../controllers/VerifyResetCodeController';

const userPasswordsRoutes = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();
const verifyResetCodeController = new VerifyResetCodeController();

userPasswordsRoutes.post('/forgot', forgotPasswordController.create);
userPasswordsRoutes.post('/reset', resetPasswordController.create);
userPasswordsRoutes.get(
  '/reset/verify-code/:verification_code',
  verifyResetCodeController.verify,
);

export default userPasswordsRoutes;
