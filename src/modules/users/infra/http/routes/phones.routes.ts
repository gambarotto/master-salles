import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UserPhonesController from '../controllers/UserPhonesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userPhonesRoutes = Router();
const userPhonesController = new UserPhonesController();

const validationRequestCreate = celebrate({
  [Segments.BODY]: {
    phone_number: Joi.string()
      .max(11)
      .min(10)
      .regex(/^[0-9]+$/)
      .required(),
    isDefault: Joi.boolean().required(),
  },
});

const validationRequestUpdate = celebrate({
  [Segments.BODY]: {
    phone_number: Joi.string()
      .max(11)
      .min(10)
      .regex(/^[0-9]+$/)
      .required(),
    isDefault: Joi.boolean().required(),
  },
  [Segments.PARAMS]: {
    phone_number_id: Joi.string().uuid().required(),
  },
});
const validationRequestParams = celebrate({
  [Segments.PARAMS]: {
    phone_number_id: Joi.string().uuid(),
  },
});

userPhonesRoutes.use(ensureAuthenticated);
userPhonesRoutes.post(
  '/me',
  validationRequestCreate,
  userPhonesController.create,
);
userPhonesRoutes.get('/me', userPhonesController.index);

userPhonesRoutes.use(validationRequestParams);
userPhonesRoutes.get('/me/:phone_number_id', userPhonesController.show);
userPhonesRoutes.put(
  '/me/:phone_number_id',
  validationRequestUpdate,
  userPhonesController.update,
);
userPhonesRoutes.delete('/me/:phone_number_id', userPhonesController.delete);

export default userPhonesRoutes;
