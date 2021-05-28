import IStoreAdressesRepository from '@modules/stores/repositories/IStoreAdressesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteStoreAdressesService {
  constructor(
    @inject('StoreAdressesRepository')
    private storeAdressesRepository: IStoreAdressesRepository,
  ) {}

  public async execute(store_id: string): Promise<void> {
    const storeAddress = await this.storeAdressesRepository.findByStoreId(
      store_id,
    );

    if (!storeAddress) {
      throw new AppError('Do not have Store Address');
    }
    await this.storeAdressesRepository.delete(storeAddress.id);
  }
}
export default DeleteStoreAdressesService;
