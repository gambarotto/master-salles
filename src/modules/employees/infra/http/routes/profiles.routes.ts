import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticatedEmployee from '@shared/infra/http/middlewares/ensureAuthenticatedEmployee';
import EmployeeProfilesController from '../controllers/EmployeeProfilesController';

const employeesProfilesRoutes = Router();
const employeeProfilesController = new EmployeeProfilesController();
employeesProfilesRoutes.use(ensureAuthenticatedEmployee);

const validationRequestUpdate = celebrate({
  [Segments.BODY]: {
    name: Joi.string(),
    email: Joi.string().email(),
    old_password: Joi.string().min(6),
    new_password: Joi.string().min(6),
    password_confirmation: Joi.string().valid(Joi.ref('new_password')),
  },
});

employeesProfilesRoutes.get('/me', employeeProfilesController.index);
employeesProfilesRoutes.put(
  '/me',
  validationRequestUpdate,
  employeeProfilesController.update,
);
employeesProfilesRoutes.delete('/me', employeeProfilesController.delete);

export default employeesProfilesRoutes;
