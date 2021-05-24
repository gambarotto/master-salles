import { Router } from 'express';
import StoreAdressesController from '../controllers/StoreAdressesController';

const storeAdressesRoutes = Router();
const storeAdressesController = new StoreAdressesController();

storeAdressesRoutes.get('/:store_id', storeAdressesController.show);
storeAdressesRoutes.post('/:store_id', storeAdressesController.create);
storeAdressesRoutes.put('/:store_id', storeAdressesController.update);
storeAdressesRoutes.delete('/:store_id', storeAdressesController.delete);

export default storeAdressesRoutes;
