import { inject, injectable } from 'tsyringe';
import Store from '../infra/typeorm/entities/Store';
import IStoresRepository from '../repositories/IStoresRepository';

@injectable()
class ListStoresService {
  constructor(
    @inject('StoresRepository')
    private storeRepository: IStoresRepository,
  ) {}

  public async execute(): Promise<Store[]> {
    const stores = await this.storeRepository.findAllStores();
    return stores;
  }
}
export default ListStoresService;
