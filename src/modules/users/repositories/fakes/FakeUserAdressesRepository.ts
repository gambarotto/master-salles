import ICreateAddressUserDto from '@modules/users/dtos/ICreateAddressUserDTO';
import UserAddress from '@modules/users/infra/typeorm/entities/UserAddress';
import { v4 } from 'uuid';
import IUserAddressRepository from '../IUserAdressesRepository';

class FakeUserAddressessRepository implements IUserAddressRepository {
  private userAdresses: UserAddress[];

  constructor() {
    this.userAdresses = [];
  }

  public async create(data: ICreateAddressUserDto): Promise<UserAddress> {
    const userAddress = new UserAddress();
    const { user_id, street, city, zip_code } = data;
    if (!user_id || !street || !city || !zip_code) {
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

  public async findById(address_id: string): Promise<UserAddress | undefined> {
    return this.userAdresses.find(address => address.id === address_id);
  }
}

export default FakeUserAddressessRepository;
