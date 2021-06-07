import express, { Router } from 'express';
import uploadConfig from '@config/upload';

const filesRoutes = Router();
filesRoutes.use(
  '/files/users',
  express.static(uploadConfig.uploadFolder.users),
);
filesRoutes.use(
  '/files/employees',
  express.static(uploadConfig.uploadFolder.employees),
);
filesRoutes.use(
  '/files/stores',
  express.static(uploadConfig.uploadFolder.stores),
);
filesRoutes.use(
  '/files/products',
  express.static(uploadConfig.uploadFolder.products),
);

export default filesRoutes;
