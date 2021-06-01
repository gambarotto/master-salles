import { Router } from 'express';
import ensureAuthenticatedEmployee from '@modules/employees/infra/http/middlewares/ensureAuthenticatedEmployee';
import CategoryController from '../controllers/CategoryController';

const categoriesRoutes = Router();
const categoryController = new CategoryController();

categoriesRoutes.get('/:category_id', categoryController.show);
categoriesRoutes.get('/', categoryController.index);

categoriesRoutes.use(ensureAuthenticatedEmployee);
categoriesRoutes.post('/', categoryController.create);
categoriesRoutes.put('/:category_id', categoryController.update);
categoriesRoutes.delete('/:category_id', categoryController.delete);

export default categoriesRoutes;
