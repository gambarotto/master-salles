import UserAddressRepository from '@modules/users/infra/typeorm/repositories/UserAdressesRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepositories';
import '@modules/users/providers';
import IUserAdressesRepository from '@modules/users/repositories/IUserAdressesRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<IUserAdressesRepository>(
  'UserAdressesRepository',
  UserAddressRepository,
);
