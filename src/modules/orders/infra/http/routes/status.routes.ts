import { Router } from 'express';
import StatusController from '../controllers/StatusController';

const statusRoutes = Router();
const statusController = new StatusController();

statusRoutes.post('/', statusController.create);

export default statusRoutes;
