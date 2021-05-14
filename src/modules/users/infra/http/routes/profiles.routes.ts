import { Router } from 'express';
import UserProfilesController from '../controllers/UserProfilesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userProfilesRoutes = Router();
const userProfilesController = new UserProfilesController();
userProfilesRoutes.use(ensureAuthenticated);

userProfilesRoutes.get('/', userProfilesController.index);
userProfilesRoutes.put('/', userProfilesController.update);
userProfilesRoutes.delete('/', userProfilesController.delete);

export default userProfilesRoutes;
