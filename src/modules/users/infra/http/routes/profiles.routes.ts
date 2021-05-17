import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UserProfilesController from '../controllers/UserProfilesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userProfilesRoutes = Router();
const userProfilesController = new UserProfilesController();
userProfilesRoutes.use(ensureAuthenticated);

const validationRequestUpdate = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email(),
    old_password: Joi.string().min(6),
    new_password: Joi.string().min(6),
    password_confirmation: Joi.string().valid(Joi.ref('new_password')),
  },
});

userProfilesRoutes.get('/me', userProfilesController.index);
userProfilesRoutes.put(
  '/me',
  validationRequestUpdate,
  userProfilesController.update,
);
userProfilesRoutes.delete('/me', userProfilesController.delete);

export default userProfilesRoutes;
