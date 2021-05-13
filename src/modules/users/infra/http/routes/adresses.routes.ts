import { Router } from 'express';
import UserAdressesController from '../controllers/UserAdressesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userAdressesRoutes = Router();
const userAdressesController = new UserAdressesController();

userAdressesRoutes.use(ensureAuthenticated);

userAdressesRoutes.get('/', userAdressesController.index);
userAdressesRoutes.post('/', userAdressesController.create);
userAdressesRoutes.put('/', userAdressesController.update);
userAdressesRoutes.delete('/:address_id', userAdressesController.delete);

export default userAdressesRoutes;
