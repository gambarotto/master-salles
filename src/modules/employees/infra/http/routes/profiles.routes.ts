import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import EmployeeProfilesController from '../controllers/EmployeeProfilesController';
import ensureAuthenticatedEmployee from '../middlewares/ensureAuthenticatedEmployee';

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
