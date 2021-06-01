import { Router } from 'express';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
import AppError from '@shared/errors/AppError';
import ensureAuthenticatedEmployee from '@shared/infra/http/middlewares/ensureAuthenticatedEmployee';
import EmployeeAvatarController from '../controllers/EmployeeAvatarController';
import EmployeesController from '../controllers/EmployeesController';

const employeesRoutes = Router();
const upload = multer(uploadConfig);
const employeesController = new EmployeesController();
const employeeAvatarController = new EmployeeAvatarController();

const method = (
  value: string,
  _helpers: { error: (arg0: string) => unknown },
) => {
  if (value !== 'admin' && value !== 'seller') {
    throw new AppError("responsibility should be 'admin' or 'seller'");
  }
  return value;
};

const validationRequestCreate = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    responsibility: Joi.string().custom(method, 'custom method').required(),
  },
});

employeesRoutes.post('/', validationRequestCreate, employeesController.create);
employeesRoutes.patch(
  '/avatar',
  ensureAuthenticatedEmployee,
  upload.single('avatar'),
  employeeAvatarController.update,
);

export default employeesRoutes;
