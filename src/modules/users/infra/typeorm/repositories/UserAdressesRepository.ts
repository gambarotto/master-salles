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
      loadRelationIds: true,
    });

    return userAddress;
  }

  public async findAllByUser(
    userId: string,
  ): Promise<UserAddress[] | undefined> {
    const userAdresses = await this.ormRepository.find({
      where: { user: { id: userId } },
    });
    return userAdresses;
  }
}
export default UserAddressessRepository;
