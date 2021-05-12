import { Router } from 'express';
import SessionController from '../controllers/SessionController';

const sessionsRoutes = Router();
const sessionsControllers = new SessionController();

sessionsRoutes.post('/', sessionsControllers.create);

export default sessionsRoutes;
