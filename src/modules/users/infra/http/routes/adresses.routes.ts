import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UserAdressesController from '../controllers/UserAdressesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UserAdressesDefaultController from '../controllers/UserAdressesDefaultController';

const userAdressesRoutes = Router();
const userAdressesController = new UserAdressesController();
const userAdressesDefaultController = new UserAdressesDefaultController();

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
    street: Joi.string(),
    number: Joi.string(),
    district: Joi.string(),
    city: Joi.string(),
    zip_code: Joi.string().max(8),
    complement: Joi.string(),
    reference_point: Joi.string(),
    alias: Joi.string(),
  },
  [Segments.PARAMS]: {
    address_id: Joi.string().uuid().required(),
  },
});
const validationRequestSetAsDefault = celebrate({
  [Segments.PARAMS]: {
    address_id: Joi.string().required(),
  },
});
userAdressesRoutes.use(ensureAuthenticated);

// Default
userAdressesRoutes.get('/me/default', userAdressesDefaultController.get);

userAdressesRoutes.patch(
  '/me/:address_id/default',
  validationRequestSetAsDefault,
  userAdressesDefaultController.set,
);
userAdressesRoutes.get('/me', userAdressesController.index);
userAdressesRoutes.post(
  '/me',
  validationRequestCreate,
  userAdressesController.create,
);
userAdressesRoutes.put(
  '/me/:address_id',
  validationRequestUpdate,
  userAdressesController.update,
);
userAdressesRoutes.get('/me/:address_id', userAdressesController.show);
userAdressesRoutes.delete('/me/:address_id', userAdressesController.delete);

export default userAdressesRoutes;
