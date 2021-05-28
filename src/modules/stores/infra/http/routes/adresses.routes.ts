import { Router } from 'express';
import StoreAdressesController from '../controllers/StoreAdressesController';

const storeAdressesRoutes = Router();
const storeAdressesController = new StoreAdressesController();

storeAdressesRoutes.get('/:storeId', storeAdressesController.show);
storeAdressesRoutes.post('/:storeId', storeAdressesController.create);
storeAdressesRoutes.put('/:storeId', storeAdressesController.update);
storeAdressesRoutes.delete('/:storeId', storeAdressesController.delete);

export default storeAdressesRoutes;
