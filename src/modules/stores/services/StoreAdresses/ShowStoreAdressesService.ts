import StoreAddress from '@modules/stores/infra/typeorm/entities/StoreAddress';
import IStoreAdressesRepository from '@modules/stores/repositories/IStoreAdressesRepository';
import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowStoreAdressesService {
  constructor(
    @inject('StoreAdressesRepository')
    private storeAdressesRepository: IStoreAdressesRepository,
    @inject('StoresRepository')
    private storeRepository: IStoresRepository,
  ) {}

  public async execute(store_id: string): Promise<StoreAddress | undefined> {
    const storeAlreadyExists = await this.storeRepository.findById({
      store_id,
    });
    if (!storeAlreadyExists) {
      throw new AppError('Store non-exists');
    }
    const storeAddress = await this.storeAdressesRepository.findByStoreId(
      store_id,
    );
    if (!storeAddress) {
      throw new AppError('Store Address non-exists');
    }
    return storeAddress;
  }
}
export default ShowStoreAdressesService;
