import ICreateStoreAdressesDTO from '@modules/stores/dtos/ICreateStoreAdressesDTO';
import StoreAddress from '@modules/stores/infra/typeorm/entities/StoreAddress';
import { v4 } from 'uuid';
import IStoreAdressesRepository from '../IStoreAdressesRepository';

class FakeStoreAdressesRepository implements IStoreAdressesRepository {
  private storeAdresses: StoreAddress[];

  constructor() {
    this.storeAdresses = [];
  }

  public async create(data: ICreateStoreAdressesDTO): Promise<StoreAddress> {
    const storeAddress = new StoreAddress();
    Object.assign(storeAddress, { id: v4() }, data);
    this.storeAdresses.push(storeAddress);
    return storeAddress;
  }

  public async update(storeAddress: StoreAddress): Promise<StoreAddress> {
    const findIndex = this.storeAdresses.findIndex(
      strAddress => strAddress.id === storeAddress.id,
    );
    this.storeAdresses[findIndex] = storeAddress;
    return storeAddress;
  }

  public async delete(store_address_id: string): Promise<void> {
    const findIndex = this.storeAdresses.findIndex(
      strAddress => strAddress.id === store_address_id,
    );

    this.storeAdresses.splice(findIndex, 1);
  }

  public async findById(
    store_address_id: string,
  ): Promise<StoreAddress | undefined> {
    const storeAddress = this.storeAdresses.find(
      strAddress => strAddress.id === store_address_id,
    );
    return storeAddress;
  }

  public async findByStoreId(
    store_id: string,
  ): Promise<StoreAddress | undefined> {
    const storeAddress = this.storeAdresses.find(
      strAddress => strAddress.store_id === store_id,
    );
    return storeAddress;
  }
}
export default FakeStoreAdressesRepository;
