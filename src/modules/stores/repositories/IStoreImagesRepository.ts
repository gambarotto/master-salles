import ICreateStoreImageDTO from '../dtos/ICreateStoreImageDTO';
import StoreImage from '../infra/typeorm/entities/StoreImage';

export default interface IStoreImagesRepository {
  create(data: ICreateStoreImageDTO): Promise<StoreImage>;
  findById(store_image_id: string): Promise<StoreImage | undefined>;
  findAll(store_id: string): Promise<StoreImage[]>;
  delete(store_image_id: string): Promise<void>;
}
