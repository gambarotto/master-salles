import ICreateStoreDTO from '@modules/stores/dtos/ICreateStoreDTO';
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

  public async delete(store_id: string): Promise<void> {
    await this.ormRepository.delete(store_id);
  }

  public async findById(store_id: string): Promise<Store | undefined> {
    const store = await this.ormRepository.findOne(store_id);
    return store;
  }

  public async findByCnpj(cnpj: string): Promise<Store | undefined> {
    const store = await this.ormRepository.findOne({ where: { cnpj } });
    return store;
  }

  public async findAllStores(): Promise<Store[]> {
    const stores = await this.ormRepository.find();
    return stores;
  }
}
export default StoresRepository;
