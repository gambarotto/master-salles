import ICreateAddressUserDto from '@modules/users/dtos/ICreateAddressUserDTO';
import IUserAddressRepository from '@modules/users/repositories/IUserAdressesRepository';
import { getRepository, Repository } from 'typeorm';
import UserAddress from '../entities/UserAddress';

class UserAddressessRepository implements IUserAddressRepository {
  private ormRepository: Repository<UserAddress>;

  constructor() {
    this.ormRepository = getRepository(UserAddress);
  }

  public async create(data: ICreateAddressUserDto): Promise<UserAddress> {
    const userAddress = this.ormRepository.create(data);
    await this.ormRepository.save(userAddress);
    return userAddress;
  }

  public async update(userAddress: UserAddress): Promise<UserAddress> {
    const updatedUserAddress = await this.ormRepository.save(userAddress);
    return updatedUserAddress;
  }

  public async findById(address_id: string): Promise<UserAddress | undefined> {
    const userAddress = await this.ormRepository.findOne(address_id);
    return userAddress;
  }
}
export default UserAddressessRepository;
