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

  public async delete(userAddress: UserAddress): Promise<void> {
    const userAddressIndex = this.userAdresses.findIndex(
      address => address.id === userAddress.id,
    );
    this.userAdresses.splice(userAddressIndex, 1);
  }

  public async findById(
    addressId: string,
  ): Promise<UserAddress | (UserAddress & { user: string }) | undefined> {
    const addressFinded = this.userAdresses.find(
      address => address.id === addressId,
    ) as UserAddress & { user: string };
    return addressFinded;
  }

  public async findAllByUser(
    user_id: string,
  ): Promise<UserAddress[] | undefined> {
    const userAdresses = this.userAdresses.filter(
      address => address.user_id === user_id,
    );
    return userAdresses;
  }
}

export default FakeUserAddressessRepository;
