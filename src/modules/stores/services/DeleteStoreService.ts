import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStoresRepository from '../repositories/IStoresRepository';

interface IRequest {
  storeId: string;
}

@injectable()
class DeleteStoreService {
  constructor(
    @inject('StoresRepository')
    private storeRepository: IStoresRepository,
  ) {}

  public async execute({ storeId }: IRequest): Promise<void> {
    const store = await this.storeRepository.findById({ storeId });

    if (!store) {
      throw new AppError('Store not found');
    }
    await this.storeRepository.delete(storeId);
  }
}
export default DeleteStoreService;
