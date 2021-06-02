import { Router } from 'express';
import ensureAuthenticatedEmployee from '@shared/infra/http/middlewares/ensureAuthenticatedEmployee';
import ProductController from '../controllers/ProductController';

const productsRoutes = Router();
const productController = new ProductController();

productsRoutes.get('/:product_id', productController.show);
productsRoutes.get('/', productController.index);

productsRoutes.use(ensureAuthenticatedEmployee);

productsRoutes.post('/', productController.create);
productsRoutes.put('/:product_id', productController.update);
productsRoutes.delete('/:product_id', productController.delete);

export default productsRoutes;
