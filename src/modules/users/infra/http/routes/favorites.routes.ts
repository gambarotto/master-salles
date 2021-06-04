import { Router } from 'express';
import UserFavoritesController from '../controllers/UserFavoritesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userFavoritesRoutes = Router();
const userFavoritesController = new UserFavoritesController();

userFavoritesRoutes.use(ensureAuthenticated);
userFavoritesRoutes.get('/', userFavoritesController.index);
userFavoritesRoutes.get('/:product_id', userFavoritesController.show);
userFavoritesRoutes.post('/', userFavoritesController.create);
userFavoritesRoutes.delete('/:product_id', userFavoritesController.delete);

export default userFavoritesRoutes;
