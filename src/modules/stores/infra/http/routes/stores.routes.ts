import { Router } from 'express';
import StoresController from '../controllers/StoresController';

const storesRoutes = Router();
const storesController = new StoresController();

storesRoutes.get('/', storesController.index);
storesRoutes.post('/', storesController.create);
storesRoutes.put('/:store_id', storesController.update);
storesRoutes.delete('/:store_id', storesController.delete);

export default storesRoutes;
