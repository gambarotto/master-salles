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

  public async delete(storeAddressId: string): Promise<void> {
    await this.ormRepository.delete(storeAddressId);
  }

  public async findById(
    storeAddressId: string,
  ): Promise<StoreAddress | undefined> {
    const storeAddress = await this.ormRepository.findOne(storeAddressId);
    return storeAddress;
  }

  public async findByStoreId(
    store_id: string,
  ): Promise<StoreAddress | undefined> {
    const storeAddress = await this.ormRepository.findOne({
      where: { store_id },
      relations: ['store_id'],
      loadRelationIds: true,
    });
    return storeAddress;
  }
}
export default StoreAdressesRepository;
