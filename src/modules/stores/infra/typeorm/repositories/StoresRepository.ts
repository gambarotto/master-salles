import ICreateStoreDTO from '@modules/stores/dtos/ICreateStoreDTO';
import IFindStoreByIdDTO from '@modules/stores/dtos/IFindStoreByIdDTO';
import Store from '@modules/stores/infra/typeorm/entities/Store';
import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import { getRepository, Repository } from 'typeorm';

class StoresRepository implements IStoresRepository {
  private ormRepository: Repository<Store>;

  constructor() {
    this.ormRepository = getRepository(Store);
  }

  public async create({
    name,
    description,
    cnpj,
  }: ICreateStoreDTO): Promise<Store> {
    const store = this.ormRepository.create({ name, description, cnpj });
    await this.ormRepository.save(store);
    return store;
  }

  public async update(store: Store): Promise<Store> {
    const storeUpdated = await this.ormRepository.save(store);
    return storeUpdated;
  }

  public async delete(storeId: string): Promise<void> {
    await this.ormRepository.delete(storeId);
  }

  public async findById({
    storeId,
    address = false,
  }: IFindStoreByIdDTO): Promise<Store | undefined> {
    let store;
    if (address) {
      store = await this.ormRepository.findOne(storeId, {
        relations: ['address'],
      });
    } else {
      store = await this.ormRepository.findOne(storeId);
    }
    return store;
  }

  public async findByCnpj(cnpj: string): Promise<Store | undefined> {
    const store = await this.ormRepository.findOne({ where: { cnpj } });
    return store;
  }

  public async findAllStores(): Promise<Store[]> {
    const stores = await this.ormRepository.find({ relations: ['address'] });
    return stores;
  }
}
export default StoresRepository;
