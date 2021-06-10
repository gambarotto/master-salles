import { Router } from 'express';
import StoreAdressesController from '../controllers/StoreAdressesController';

const storeAdressesRoutes = Router();
const storeAdressesController = new StoreAdressesController();

storeAdressesRoutes.get('/:store_id/adresses', storeAdressesController.show);
storeAdressesRoutes.post('/:store_id/adresses', storeAdressesController.create);
storeAdressesRoutes.put('/:store_id/adresses', storeAdressesController.update);
storeAdressesRoutes.delete(
  '/:store_id/adresses',
  storeAdressesController.delete,
);

export default storeAdressesRoutes;
