import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkAlreadyExists = await this.usersRepository.findByEmail(email);
    if (checkAlreadyExists) {
      throw new Error('Email address already used.');
    }
    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return user;
  }
}
export default CreateUserService;
