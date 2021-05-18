import IStoreAdressesRepository from '@modules/stores/repositories/IStoreAdressesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  store_address_id: string;
}

@injectable()
class DeleteStoreAdressesService {
  constructor(
    @inject('StoreAdressesRepository')
    private storeAdressesRepository: IStoreAdressesRepository,
  ) {}

  public async execute({ store_address_id }: IRequest): Promise<void> {
    const storeAddress = await this.storeAdressesRepository.findById(
      store_address_id,
    );

    if (!storeAddress) {
      throw new AppError('Store not found');
    }
    await this.storeAdressesRepository.delete(store_address_id);
  }
}
export default DeleteStoreAdressesService;
