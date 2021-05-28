import ICreateAddressUserDTO from '@modules/users/dtos/ICreateAddressUserDTO';
import UserAddress from '@modules/users/infra/typeorm/entities/UserAddress';
import { v4 } from 'uuid';
import IUserAddressRepository from '../IUserAdressesRepository';

class FakeUserAddressessRepository implements IUserAddressRepository {
  private userAdresses: UserAddress[];

  constructor() {
    this.userAdresses = [];
  }

  public async create(data: ICreateAddressUserDTO): Promise<UserAddress> {
    const userAddress = new UserAddress();
    const { user, street, city, zipCode } = data;
    if (!user || !street || !city || !zipCode) {
      throw new Error('Error');
    }
    Object.assign(userAddress, { id: v4() }, data);
    this.userAdresses.push(userAddress);
    return userAddress;
  }

  public async update(userAddress: UserAddress): Promise<UserAddress> {
    const userAddressIndex = this.userAdresses.findIndex(
      address => address.id === userAddress.id,
    );
    this.userAdresses[userAddressIndex] = userAddress;
    return userAddress;
  }

  public async delete(userAddress: UserAddress): Promise<void> {
    const userAddressIndex = this.userAdresses.findIndex(
      address => address.id === userAddress.id,
    );
    this.userAdresses.splice(userAddressIndex, 1);
  }

  public async findById(address_id: string): Promise<UserAddress | undefined> {
    return this.userAdresses.find(address => address.id === address_id);
  }

  public async findAllByUser(
    userId: string,
  ): Promise<UserAddress[] | undefined> {
    const userAdresses = this.userAdresses.filter(
      address => address.user.id === userId,
    );
    return userAdresses;
  }
}

export default FakeUserAddressessRepository;
