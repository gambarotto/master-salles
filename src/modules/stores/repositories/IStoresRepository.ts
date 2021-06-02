import ICreateStoreDTO from '../dtos/ICreateStoreDTO';
import IFindStoreByIdDTO from '../dtos/IFindStoreByIdDTO';
import Store from '../infra/typeorm/entities/Store';

export default interface IStoresRepository {
  create(data: ICreateStoreDTO): Promise<Store>;
  update(store: Store): Promise<Store>;
  findByCnpj(cnpj: string): Promise<Store | undefined>;
  findById({
    store_id,
    address,
  }: IFindStoreByIdDTO): Promise<Store | undefined>;
  delete(store_id: string): Promise<void>;
  findAllStores(): Promise<Store[]>;
}
