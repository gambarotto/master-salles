import userAdressesRoutes from '@modules/users/infra/http/routes/adresses.routes';
import userProfilesRoutes from '@modules/users/infra/http/routes/profiles.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/adresses', userAdressesRoutes);
routes.use('/profiles', userProfilesRoutes);

export default routes;
