import ensureAuthenticatedEmployee from '@shared/infra/http/middlewares/ensureAuthenticatedEmployee';
import { Router } from 'express';
import uploadConfig from '@config/upload';
import multer from 'multer';
import StoreImagesController from '../controllers/StoreImagesController';

const storeImagesRoutes = Router();
const upload = multer(uploadConfig);
const storeImagesController = new StoreImagesController();

storeImagesRoutes.get('/:store_id/images', storeImagesController.index);

storeImagesRoutes.use(ensureAuthenticatedEmployee);
storeImagesRoutes.post(
  '/:store_id/images',
  upload.single('image'),
  storeImagesController.create,
);
storeImagesRoutes.delete(
  '/images/:store_image_id',
  storeImagesController.delete,
);

export default storeImagesRoutes;
