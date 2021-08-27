import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UserFavoritesController from '../controllers/UserFavoritesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userFavoritesRoutes = Router();
const userFavoritesController = new UserFavoritesController();

const validationRequestCreate = celebrate({
  [Segments.BODY]: {
    product_id: Joi.string().uuid().required(),
  },
});

userFavoritesRoutes.use(ensureAuthenticated);
userFavoritesRoutes.get('/', userFavoritesController.index);
userFavoritesRoutes.get('/:product_id', userFavoritesController.show);
userFavoritesRoutes.post(
  '/',
  validationRequestCreate,
  userFavoritesController.create,
);
userFavoritesRoutes.delete('/:product_id', userFavoritesController.delete);

export default userFavoritesRoutes;
