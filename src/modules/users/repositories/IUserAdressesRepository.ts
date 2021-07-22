import ICreateAddressUserDto from '../dtos/ICreateAddressUserDTO';
import UserAddress from '../infra/typeorm/entities/UserAddress';

export default interface IAddressRepository {
  create(addressData: ICreateAddressUserDto): Promise<UserAddress>;
  update(updateData: UserAddress): Promise<UserAddress>;
  delete(userAddress: UserAddress): Promise<void>;
  findById(address_id: string): Promise<UserAddress | undefined>;
  findAllByUser(user_id: string): Promise<UserAddress[] | undefined>;
  findDefaultUserAddress(user_id: string): Promise<UserAddress | undefined>;
}
