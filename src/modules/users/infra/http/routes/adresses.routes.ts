import { Router } from 'express';
import UserAdressesController from '../controllers/UserAdressesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userAdressesRoutes = Router();
const userAdressesController = new UserAdressesController();

userAdressesRoutes.use(ensureAuthenticated);

userAdressesRoutes.get('/me', userAdressesController.index);
userAdressesRoutes.post('/me', userAdressesController.create);
userAdressesRoutes.put('/me', userAdressesController.update);
userAdressesRoutes.delete('/me/:address_id', userAdressesController.delete);

export default userAdressesRoutes;
