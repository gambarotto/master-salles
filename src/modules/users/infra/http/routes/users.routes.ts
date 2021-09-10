import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import uploadConfig from '@config/upload';
import multer from 'multer';
import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';
import UsersFacebookController from '../controllers/UsersFacebookController';

const usersRoutes = Router();
const upload = multer(uploadConfig);
const usersControllers = new UsersController();
const usersFacebookController = new UsersFacebookController();
const userAvatarController = new UserAvatarController();

const validationRequestCreate = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    avatar_social_media: Joi.string(),
  },
});

usersRoutes.post('/', validationRequestCreate, usersControllers.create);
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);
usersRoutes.post(
  '/fb',
  validationRequestCreate,
  usersFacebookController.create,
);
usersRoutes.get('/secret', ensureAuthenticated, usersControllers.getSecret);

export default usersRoutes;
