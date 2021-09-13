import { Router } from 'express';
import ensureAuthenticatedEmployee from '@shared/infra/http/middlewares/ensureAuthenticatedEmployee';
import uploadConfig from '@config/upload';
import multer from 'multer';
import CategoryController from '../controllers/CategoryController';
import ImageCategoryController from '../controllers/ImageCategoryController';

const categoriesRoutes = Router();
const upload = multer(uploadConfig);
const categoryController = new CategoryController();
const imageCategoryController = new ImageCategoryController();

categoriesRoutes.get('/:category_id', categoryController.show);
categoriesRoutes.get('/', categoryController.index);

categoriesRoutes.use(ensureAuthenticatedEmployee);
categoriesRoutes.post('/', categoryController.create);
categoriesRoutes.put('/:category_id', categoryController.update);
categoriesRoutes.delete('/:category_id', categoryController.delete);

categoriesRoutes.put(
  '/image/:category_id',
  upload.single('image'),
  imageCategoryController.update,
);

export default categoriesRoutes;
