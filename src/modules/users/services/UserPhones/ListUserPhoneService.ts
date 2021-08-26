import UserPhone from '@modules/users/infra/typeorm/entities/UserPhone';
import IUserPhoneRepository from '@modules/users/repositories/IUserPhoneRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
}

@injectable()
class ListUserPhoneService {
  constructor(
    @inject('UserPhoneRepository')
    private userPhoneRepository: IUserPhoneRepository,
  ) {}

  async execute({ user_id }: IRequest): Promise<UserPhone[]> {
    const userPhones = await this.userPhoneRepository.findAllByUser(user_id);

    return userPhones;
  }
}
export default ListUserPhoneService;
