import { Router } from 'express';
import ensureAuthenticatedEmployee from '@shared/infra/http/middlewares/ensureAuthenticatedEmployee';
import uploadConfig from '@config/upload';
import multer from 'multer';
import ProductController from '../controllers/ProductController';
import ProductPhotosController from '../controllers/ProductPhotosController';

const productsRoutes = Router();
const upload = multer(uploadConfig);
const productController = new ProductController();
const productPhotosController = new ProductPhotosController();

productsRoutes.get('/:product_id', productController.show);
productsRoutes.get('/', productController.index);

productsRoutes.use(ensureAuthenticatedEmployee);

productsRoutes.post('/', productController.create);
productsRoutes.put('/:product_id', productController.update);
productsRoutes.delete('/:product_id', productController.delete);

/** PHOTOS ROUTES */
productsRoutes.post(
  '/:product_id/photos',
  upload.single('photo'),
  productPhotosController.create,
);
productsRoutes.delete(
  '/photos/:product_photo_id',
  productPhotosController.delete,
);

export default productsRoutes;
