import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../../../shared/container/providers/hashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  avatar_social_media?: string;
}

@injectable()
class CreateUserWithFacebookService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    avatar_social_media,
  }: IRequest): Promise<User> {
    const checkAlreadyExists = await this.usersRepository.findByEmail(email);
    if (checkAlreadyExists) {
      return checkAlreadyExists;
    }
    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      avatar_social_media,
    });
    return user;
  }
}
export default CreateUserWithFacebookService;
