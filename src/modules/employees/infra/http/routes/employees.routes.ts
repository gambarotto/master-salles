import { Router } from 'express';
import uploadConfig from '@config/upload';
import multer from 'multer';
import EmployeeAvatarController from '../controllers/EmployeeAvatarController';
import EmployeesController from '../controllers/EmployeesController';
import ensureAuthenticatedEmployee from '../middlewares/ensureAuthenticatedEmployee';

const employeesRoutes = Router();
const upload = multer(uploadConfig);
const employeesController = new EmployeesController();
const employeeAvatarController = new EmployeeAvatarController();

employeesRoutes.post('/', employeesController.create);
employeesRoutes.patch(
  '/avatar',
  ensureAuthenticatedEmployee,
  upload.single('avatar'),
  employeeAvatarController.update,
);

export default employeesRoutes;
