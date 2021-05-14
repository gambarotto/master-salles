import employeesRoutes from '@modules/employees/infra/http/routes/employees.routes';
import employeesProfilesRoutes from '@modules/employees/infra/http/routes/profiles.routes';
import userAdressesRoutes from '@modules/users/infra/http/routes/adresses.routes';
import userProfilesRoutes from '@modules/users/infra/http/routes/profiles.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';
import sessionsRoutes from './sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRoutes);

routes.use('/users', usersRoutes);
routes.use('/adresses', userAdressesRoutes);
routes.use('/profiles/users', userProfilesRoutes);

routes.use('/employees', employeesRoutes);
routes.use('/profiles/employees', employeesProfilesRoutes);

export default routes;
