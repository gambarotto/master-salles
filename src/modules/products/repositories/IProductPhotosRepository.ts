import ICreateProductPhotoDTO from '../dtos/ICreateProductPhotoDTO';
import ProductPhoto from '../infra/typeorm/entities/ProductPhoto';

export default interface IProductPhotosRepository {
  findById(product_photo_id: string): Promise<ProductPhoto | undefined>;
  findAll(product_id: string): Promise<ProductPhoto[]>;
  create(data: ICreateProductPhotoDTO): Promise<ProductPhoto>;
  delete(product_photo_id: string): Promise<void>;
}
