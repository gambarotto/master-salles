import './providers';
import { container } from 'tsyringe';

import UserAddressRepository from '@modules/users/infra/typeorm/repositories/UserAdressesRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepositories';

import IUserAdressesRepository from '@modules/users/repositories/IUserAdressesRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';

import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import EmployeesRepository from '@modules/employees/infra/typeorm/repositories/EmployeesRepository';

import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import StoresRepository from '@modules/stores/infra/typeorm/repositories/StoresRepository';

import IStoreAdressesRepository from '@modules/stores/repositories/IStoreAdressesRepository';
import StoreAdressesRepository from '@modules/stores/infra/typeorm/repositories/StoreAdressesRepository';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import IStoreImagesRepository from '@modules/stores/repositories/IStoreImagesRepository';
import StoreImagesRepository from '@modules/stores/infra/typeorm/repositories/StoreImagesRepository';

import IProductPhotosRepository from '@modules/products/repositories/IProductPhotosRepository';
import ProductPhotosRepository from '@modules/products/infra/typeorm/repositories/ProductPhotoRepository';
import IHandleImageProvider from './providers/handleImageProvider/model/IHandleImageProvider';
import SharpHandleImageProvider from './providers/handleImageProvider/implementations/SharpHandleImageProvider';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<IUserAdressesRepository>(
  'UserAdressesRepository',
  UserAddressRepository,
);
container.registerSingleton<IEmployeesRepository>(
  'EmployeesRepository',
  EmployeesRepository,
);
container.registerSingleton<IStoresRepository>(
  'StoresRepository',
  StoresRepository,
);
container.registerSingleton<IStoreAdressesRepository>(
  'StoreAdressesRepository',
  StoreAdressesRepository,
);
container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);
container.registerSingleton<IStoreImagesRepository>(
  'StoreImagesRepository',
  StoreImagesRepository,
);
container.registerSingleton<IProductPhotosRepository>(
  'ProductPhotosRepository',
  ProductPhotosRepository,
);
container.registerSingleton<IHandleImageProvider>(
  'SharpHandleImageProvider',
  SharpHandleImageProvider,
);
