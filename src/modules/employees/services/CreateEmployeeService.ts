import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Employee from '../infra/typeorm/entities/Employee';
import IEmployeesRepository from '../repositories/IEmployeesRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  responsibility: string;
}

@injectable()
class CreateEmployeeService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    responsibility,
  }: IRequest): Promise<Employee> {
    const checkAlreadyExists = await this.employeesRepository.findByEmail(
      email,
    );
    if (checkAlreadyExists) {
      throw new AppError('Email address already used.');
    }
    if (responsibility !== 'admin' && responsibility !== 'seller') {
      throw new AppError('responsibility should be equal to admin or seller');
    }
    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = await this.employeesRepository.create({
      name,
      email,
      password: hashedPassword,
      responsibility,
    });
    return user;
  }
}
export default CreateEmployeeService;
