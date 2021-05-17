import ICreateStoreDTO from '../dtos/ICreateStoreDTO';
import Store from '../infra/typeorm/entities/Store';

export default interface IStoresRepository {
  create(data: ICreateStoreDTO): Promise<Store>;
  update(store: Store): Promise<Store>;
  findByCnpj(cnpj: string): Promise<Store | undefined>;
  findById(store_id: string): Promise<Store | undefined>;
  delete(store_id: string): Promise<void>;
  findAllStores(): Promise<Store[]>;
}
