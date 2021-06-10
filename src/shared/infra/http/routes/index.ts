import categoriesRoutes from '@modules/categories/infra/http/routes/categories.routes';
import employeesRoutes from '@modules/employees/infra/http/routes/employees.routes';
import employeesProfilesRoutes from '@modules/employees/infra/http/routes/profiles.routes';
import productsRoutes from '@modules/products/infra/http/routes/products.routes';
import storeAdressesRoutes from '@modules/stores/infra/http/routes/adresses.routes';
import storeImagesRoutes from '@modules/stores/infra/http/routes/images.routes';
import storesRoutes from '@modules/stores/infra/http/routes/stores.routes';
import userAdressesRoutes from '@modules/users/infra/http/routes/adresses.routes';
import userFavoritesRoutes from '@modules/users/infra/http/routes/favorites.routes';
import userProfilesRoutes from '@modules/users/infra/http/routes/profiles.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';
import sessionsRoutes from './sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRoutes);

routes.use('/users', usersRoutes);
routes.use('/users/adresses', userAdressesRoutes);
routes.use('/users/profiles', userProfilesRoutes);
routes.use('/users/favorites', userFavoritesRoutes);

routes.use('/employees', employeesRoutes);
routes.use('/employees/profiles', employeesProfilesRoutes);

routes.use('/stores', storesRoutes);
routes.use('/stores', storeAdressesRoutes);
routes.use('/stores', storeImagesRoutes);

routes.use('/categories', categoriesRoutes);

routes.use('/products', productsRoutes);

export default routes;
