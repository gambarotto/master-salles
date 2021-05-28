import IStoreAdressesRepository from '@modules/stores/repositories/IStoreAdressesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteStoreAdressesService {
  constructor(
    @inject('StoreAdressesRepository')
    private storeAdressesRepository: IStoreAdressesRepository,
  ) {}

  public async execute(storeId: string): Promise<void> {
    const storeAddress = await this.storeAdressesRepository.findByStoreId(
      storeId,
    );

    if (!storeAddress) {
      throw new AppError('Do not have Store Address');
    }
    await this.storeAdressesRepository.delete(storeAddress.id);
  }
}
export default DeleteStoreAdressesService;
