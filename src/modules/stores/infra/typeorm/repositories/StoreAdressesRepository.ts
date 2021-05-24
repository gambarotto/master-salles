import ICreateStoreAdressesDTO from '@modules/stores/dtos/ICreateStoreAdressesDTO';
import StoreAddress from '@modules/stores/infra/typeorm/entities/StoreAddress';
import IStoreAdressesRepository from '@modules/stores/repositories/IStoreAdressesRepository';
import { getRepository, Repository } from 'typeorm';

class StoreAdressesRepository implements IStoreAdressesRepository {
  private ormRepository: Repository<StoreAddress>;

  constructor() {
    this.ormRepository = getRepository(StoreAddress);
  }

  public async create(data: ICreateStoreAdressesDTO): Promise<StoreAddress> {
    const storeAddress = this.ormRepository.create(data);
    const storeAddressSaved = await this.ormRepository.save(storeAddress);
    return storeAddressSaved;
  }

  public async update(storeAddress: StoreAddress): Promise<StoreAddress> {
    const storeAddressSaved = await this.ormRepository.save(storeAddress);
    return storeAddressSaved;
  }

  public async delete(store_address_id: string): Promise<void> {
    await this.ormRepository.delete(store_address_id);
  }

  public async findById(
    store_address_id: string,
  ): Promise<StoreAddress | undefined> {
    const storeAddress = await this.ormRepository.findOne(store_address_id);
    return storeAddress;
  }

  public async findByStoreId(
    store_id: string,
  ): Promise<StoreAddress | undefined> {
    const storeAddress = await this.ormRepository.findOne({
      where: { store_id },
    });
    return storeAddress;
  }
}
export default StoreAdressesRepository;
