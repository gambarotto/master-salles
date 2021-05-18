import ICreateStoreAdressesDTO from '../dtos/ICreateStoreAdressesDTO';
import StoreAddress from '../infra/typeorm/entities/StoreAddress';

export default interface IStoreAdressesRepository {
  create(data: ICreateStoreAdressesDTO): Promise<StoreAddress>;
  update(storeAddress: StoreAddress): Promise<StoreAddress>;
  // findByCnpj(cnpj: string): Promise<Store | undefined>;
  findByStoreId(store_id: string): Promise<StoreAddress | undefined>;
  findById(store_address_id: string): Promise<StoreAddress | undefined>;
  delete(store_address_id: string): Promise<void>;
}
