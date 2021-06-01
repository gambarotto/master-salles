import { Router } from 'express';
import ensureAuthenticatedEmployee from '@shared/infra/http/middlewares/ensureAuthenticatedEmployee';
import ProductController from '../controllers/ProductController';

const productsRoutes = Router();
const productController = new ProductController();

productsRoutes.use(ensureAuthenticatedEmployee);
productsRoutes.post('/', productController.create);

export default productsRoutes;
