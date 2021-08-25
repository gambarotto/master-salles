import ICreateAddressUserDTO from '@modules/users/dtos/ICreateAddressUserDTO';
import IUserAddressRepository from '@modules/users/repositories/IUserAdressesRepository';
import { getRepository, Repository } from 'typeorm';
import UserAddress from '../entities/UserAddress';

class UserAddressessRepository implements IUserAddressRepository {
  private ormRepository: Repository<UserAddress>;

  constructor() {
    this.ormRepository = getRepository(UserAddress);
  }

  public async create(data: ICreateAddressUserDTO): Promise<UserAddress> {
    const userAddress = this.ormRepository.create(data);
    await this.ormRepository.save(userAddress);
    return userAddress;
  }

  public async update(userAddress: UserAddress): Promise<UserAddress> {
    const updatedUserAddress = await this.ormRepository.save(userAddress);
    return updatedUserAddress;
  }

  public async delete(userAddress: UserAddress): Promise<void> {
    await this.ormRepository.delete(userAddress.id);
  }

  public async findById(
    addressId: string,
  ): Promise<UserAddress | (UserAddress & { user: string }) | undefined> {
    const userAddress = await this.ormRepository.findOne(addressId, {
      relations: ['user_id'],
      loadRelationIds: true,
    });

    return userAddress;
  }

  public async findAllByUser(user_id: string): Promise<UserAddress[]> {
    const userAdresses = await this.ormRepository.find({
      where: { user_id },
      relations: ['user_id'],
      loadRelationIds: true,
    });
    return userAdresses;
  }

  public async findDefaultUserAddress(
    user_id: string,
  ): Promise<UserAddress | undefined> {
    const userAddressDefault = await this.ormRepository.findOne({
      where: { user_id, default: true },
    });
    return userAddressDefault;
  }
}
export default UserAddressessRepository;
