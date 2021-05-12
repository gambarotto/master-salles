import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const usersRoutes = Router();
const usersControllers = new UsersController();

usersRoutes.post('/', usersControllers.create);

export default usersRoutes;
