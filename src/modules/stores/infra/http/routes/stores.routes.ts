import { Router } from 'express';
import StoresController from '../controllers/StoresController';

const storesRoutes = Router();
const storesController = new StoresController();

storesRoutes.get('/', storesController.index);
storesRoutes.post('/', storesController.create);
storesRoutes.put('/:storeId', storesController.update);
storesRoutes.delete('/:storeId', storesController.delete);

export default storesRoutes;
