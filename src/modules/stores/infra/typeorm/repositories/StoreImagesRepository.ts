import ICreateStoreImageDTO from '@modules/stores/dtos/ICreateStoreImageDTO';
import IStoreImagesRepository from '@modules/stores/repositories/IStoreImagesRepository';
import { getRepository, Repository } from 'typeorm';
import StoreImage from '../entities/StoreImage';

class StoreImagesRepository implements IStoreImagesRepository {
  private ormRepository: Repository<StoreImage>;

  constructor() {
    this.ormRepository = getRepository(StoreImage);
  }

  public async create({
    store_id,
    path,
    name,
  }: ICreateStoreImageDTO): Promise<StoreImage> {
    const storeImage = this.ormRepository.create({ store_id, path, name });
    await this.ormRepository.save(storeImage);
    return storeImage;
  }

  public async findById(
    store_image_id: string,
  ): Promise<StoreImage | undefined> {
    const storeImage = await this.ormRepository.findOne(store_image_id);
    return storeImage;
  }

  public async findAll(store_id: string): Promise<StoreImage[]> {
    const storeImages = await this.ormRepository.find({ where: { store_id } });
    return storeImages;
  }

  public async delete(store_image_id: string): Promise<void> {
    await this.ormRepository.delete(store_image_id);
  }
}
export default StoreImagesRepository;
