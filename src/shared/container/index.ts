import './providers';
import { container } from 'tsyringe';

import UserAddressRepository from '@modules/users/infra/typeorm/repositories/UserAdressesRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepositories';

import IUserAdressesRepository from '@modules/users/repositories/IUserAdressesRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';

import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import EmployeesRepository from '@modules/employees/infra/typeorm/repositories/EmployeesRepository';

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
