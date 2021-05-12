import userAdressesRoutes from '@modules/users/infra/http/routes/adresses.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/adresses', userAdressesRoutes);

export default routes;
