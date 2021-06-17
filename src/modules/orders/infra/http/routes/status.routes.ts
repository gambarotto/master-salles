import { Router } from 'express';
import StatusController from '../controllers/StatusController';

const statusRoutes = Router();
const statusController = new StatusController();

statusRoutes.get('/', statusController.index);
statusRoutes.post('/', statusController.create);
statusRoutes.put('/:status_id', statusController.update);
statusRoutes.get('/:status_id', statusController.show);
statusRoutes.delete('/:status_id', statusController.delete);

export default statusRoutes;
