import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const userPasswordsRoutes = Router();
const forgotPasswordController = new ForgotPasswordController();

userPasswordsRoutes.post('/forgot', forgotPasswordController.create);

export default userPasswordsRoutes;
