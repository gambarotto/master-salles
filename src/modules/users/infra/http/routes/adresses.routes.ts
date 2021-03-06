import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UserAdressesController from '../controllers/UserAdressesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userAdressesRoutes = Router();
const userAdressesController = new UserAdressesController();

const validationRequestCreate = celebrate({
  [Segments.BODY]: {
    street: Joi.string().required(),
    number: Joi.string().required(),
    district: Joi.string().required(),
    city: Joi.string().required(),
    zip_code: Joi.string().required().max(8),
    complement: Joi.string(),
    reference_point: Joi.string(),
    alias: Joi.string(),
  },
});
const validationRequestUpdate = celebrate({
  [Segments.BODY]: {
    id: Joi.string().uuid().required(),
    street: Joi.string(),
    number: Joi.string(),
    district: Joi.string(),
    city: Joi.string(),
    zip_code: Joi.string().max(8),
    complement: Joi.string(),
    reference_point: Joi.string(),
    alias: Joi.string(),
  },
});
userAdressesRoutes.use(ensureAuthenticated);

userAdressesRoutes.get('/me', userAdressesController.index);
userAdressesRoutes.post(
  '/me',
  validationRequestCreate,
  userAdressesController.create,
);
userAdressesRoutes.put(
  '/me',
  validationRequestUpdate,
  userAdressesController.update,
);
userAdressesRoutes.delete('/me/:address_id', userAdressesController.delete);

export default userAdressesRoutes;
