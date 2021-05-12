import { Router } from 'express';
import UserAdressesController from '../controllers/AdressesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userAdressesRoutes = Router();
const userAdressesController = new UserAdressesController();

userAdressesRoutes.use(ensureAuthenticated);
userAdressesRoutes.post('/', userAdressesController.create);
userAdressesRoutes.put('/', userAdressesController.update);

export default userAdressesRoutes;
