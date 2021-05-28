import ICreateStoreAdressesDTO from '../dtos/ICreateStoreAdressesDTO';
import StoreAddress from '../infra/typeorm/entities/StoreAddress';

export default interface IStoreAdressesRepository {
  create(data: ICreateStoreAdressesDTO): Promise<StoreAddress>;
  update(storeAddress: StoreAddress): Promise<StoreAddress>;
  // findByCnpj(cnpj: string): Promise<Store | undefined>;
  findByStoreId(store_id: string): Promise<StoreAddress | undefined>;
  findById(storeAddressId: string): Promise<StoreAddress | undefined>;
  delete(storeAddressId: string): Promise<void>;
}
