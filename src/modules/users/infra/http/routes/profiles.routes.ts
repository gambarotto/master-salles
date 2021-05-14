import { Router } from 'express';
import UserProfilesController from '../controllers/UserProfilesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userProfilesRoutes = Router();
const userProfilesController = new UserProfilesController();
userProfilesRoutes.use(ensureAuthenticated);

userProfilesRoutes.get('/me', userProfilesController.index);
userProfilesRoutes.put('/me', userProfilesController.update);
userProfilesRoutes.delete('/me', userProfilesController.delete);

export default userProfilesRoutes;
