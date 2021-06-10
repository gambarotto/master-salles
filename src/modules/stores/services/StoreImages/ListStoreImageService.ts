import { inject, injectable } from 'tsyringe';
import StoreImage from '@modules/stores/infra/typeorm/entities/StoreImage';
import IStoreImagesRepository from '@modules/stores/repositories/IStoreImagesRepository';
import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class ListStoreImageService {
  constructor(
    @inject('StoreImagesRepository')
    private storeImagesRepository: IStoreImagesRepository,
    @inject('StoresRepository')
    private storeRepository: IStoresRepository,
  ) {}

  public async execute(store_id: string): Promise<StoreImage[]> {
    const store = await this.storeRepository.findById({
      store_id,
    });
    if (!store) {
      throw new AppError('Store not found');
    }
    const images = await this.storeImagesRepository.findAll(store_id);
    return images;
  }
}
export default ListStoreImageService;
