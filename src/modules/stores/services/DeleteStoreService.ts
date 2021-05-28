import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStoresRepository from '../repositories/IStoresRepository';

interface IRequest {
  store_id: string;
}

@injectable()
class DeleteStoreService {
  constructor(
    @inject('StoresRepository')
    private storeRepository: IStoresRepository,
  ) {}

  public async execute({ store_id }: IRequest): Promise<void> {
    const store = await this.storeRepository.findById({ store_id });

    if (!store) {
      throw new AppError('Store not found');
    }
    await this.storeRepository.delete(store_id);
  }
}
export default DeleteStoreService;
