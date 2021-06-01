import categoriesRoutes from '@modules/categories/infra/http/routes/categories.routes';
import employeesRoutes from '@modules/employees/infra/http/routes/employees.routes';
import employeesProfilesRoutes from '@modules/employees/infra/http/routes/profiles.routes';
import storeAdressesRoutes from '@modules/stores/infra/http/routes/adresses.routes';
import storesRoutes from '@modules/stores/infra/http/routes/stores.routes';
import userAdressesRoutes from '@modules/users/infra/http/routes/adresses.routes';
import userProfilesRoutes from '@modules/users/infra/http/routes/profiles.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';
import sessionsRoutes from './sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRoutes);

routes.use('/users', usersRoutes);
routes.use('/adresses/users', userAdressesRoutes);
routes.use('/profiles/users', userProfilesRoutes);

routes.use('/employees', employeesRoutes);
routes.use('/profiles/employees', employeesProfilesRoutes);

routes.use('/stores', storesRoutes);
routes.use('/adresses/stores', storeAdressesRoutes);

routes.use('/categories', categoriesRoutes);

export default routes;
