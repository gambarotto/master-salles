import { v4 } from 'uuid';
import ICreateStoreImageDTO from '@modules/stores/dtos/ICreateStoreImageDTO';
import StoreImage from '@modules/stores/infra/typeorm/entities/StoreImage';
import IStoreImagesRepository from '../IStoreImagesRepository';

class FakeStoreImagesRepository implements IStoreImagesRepository {
  storeImages: StoreImage[];

  constructor() {
    this.storeImages = [];
  }

  public async create({
    store_id,
    path,
    name,
  }: ICreateStoreImageDTO): Promise<StoreImage> {
    const storeImage = new StoreImage();
    Object.assign(storeImage, { id: v4(), name, path, store_id });
    this.storeImages.push(storeImage);
    return storeImage;
  }

  public async findById(
    store_image_id: string,
  ): Promise<StoreImage | undefined> {
    const storeImage = this.storeImages.find(
      strImage => strImage.id === store_image_id,
    );
    return storeImage;
  }

  public async findAll(store_id: string): Promise<StoreImage[]> {
    return this.storeImages.filter(strImage => strImage.store_id === store_id);
  }

  public async delete(store_image_id: string): Promise<void> {
    const index = this.storeImages.findIndex(
      strImage => strImage.id === store_image_id,
    );
    this.storeImages.splice(index, 1);
  }
}
export default FakeStoreImagesRepository;
