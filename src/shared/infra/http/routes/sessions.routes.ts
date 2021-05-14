import SessionEmployeesController from '@modules/employees/infra/http/controllers/SessionEmployeeController';
import { Router } from 'express';
import SessionUserController from '../../../../modules/users/infra/http/controllers/SessionUserController';

const sessionsRoutes = Router();
const sessionUsersControllers = new SessionUserController();
const sessionEmployeesController = new SessionEmployeesController();

sessionsRoutes.post('/users', sessionUsersControllers.create);
sessionsRoutes.post('/employees', sessionEmployeesController.create);

export default sessionsRoutes;
