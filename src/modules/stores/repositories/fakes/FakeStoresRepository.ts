import ICreateStoreDTO from '@modules/stores/dtos/ICreateStoreDTO';
import IFindStoreByIdDTO from '@modules/stores/dtos/IFindStoreByIdDTO';
import Store from '@modules/stores/infra/typeorm/entities/Store';
import { v4 } from 'uuid';
import IStoresRepository from '../IStoresRepository';

class FakeStoresRepository implements IStoresRepository {
  private stores: Store[];

  constructor() {
    this.stores = [];
  }

  public async create({
    name,
    description,
    cnpj,
  }: ICreateStoreDTO): Promise<Store> {
    const store = new Store();
    Object.assign(store, { id: v4() }, { name, description, cnpj });
    this.stores.push(store);
    return store;
  }

  public async update(store: Store): Promise<Store> {
    const storeIndex = this.stores.findIndex(
      strIndex => strIndex.id === store.id,
    );
    this.stores[storeIndex] = store;

    return this.stores[storeIndex];
  }

  public async delete(storeId: string): Promise<void> {
    const storeIndex = this.stores.findIndex(
      strIndex => strIndex.id === storeId,
    );
    this.stores.splice(storeIndex, 1);
  }

  public async findById({
    storeId,
    address = false,
  }: IFindStoreByIdDTO): Promise<Store | undefined> {
    const store = this.stores.find(str => str.id === storeId);
    if (address && store?.address !== undefined) {
      store.address = { ...store.address };
    }
    return store;
  }

  public async findByCnpj(cnpj: string): Promise<Store | undefined> {
    const store = this.stores.find(str => str.cnpj === cnpj);
    return store;
  }

  public async findAllStores(): Promise<Store[]> {
    return this.stores;
  }
}
export default FakeStoresRepository;
