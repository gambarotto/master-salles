import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import authConfig from '@config/auth';
import { sign } from 'jsonwebtoken';
import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider';
import Employee from '../infra/typeorm/entities/Employee';
import IEmployeesRepository from '../repositories/IEmployeesRepository';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  employee: Employee;
  token: string;
}

@injectable()
class AuthenticateEmployeesService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const employee = await this.employeesRepository.findByEmail(email);
    if (!employee) {
      throw new AppError('Employee not found');
    }
    const passwordMatched = await this.hashProvider.compareHash(
      password,
      employee.password,
    );
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: employee.id,
      expiresIn,
    });
    return { employee, token };
  }
}
export default AuthenticateEmployeesService;
