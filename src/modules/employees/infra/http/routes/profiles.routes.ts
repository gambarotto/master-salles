import { Router } from 'express';
import EmployeeProfilesController from '../controllers/EmployeeProfilesController';
import ensureAuthenticatedEmployee from '../middlewares/ensureAuthenticatedEmployee';

const employeesProfilesRoutes = Router();
const employeeProfilesController = new EmployeeProfilesController();
employeesProfilesRoutes.use(ensureAuthenticatedEmployee);

employeesProfilesRoutes.get('/me', employeeProfilesController.index);
employeesProfilesRoutes.put('/me', employeeProfilesController.update);
employeesProfilesRoutes.delete('/me', employeeProfilesController.delete);

export default employeesProfilesRoutes;
