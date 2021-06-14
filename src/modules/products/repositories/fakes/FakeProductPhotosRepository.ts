import ICreateProductPhotoDTO from '@modules/products/dtos/ICreateProductPhotoDTO';
import ProductPhoto from '@modules/products/infra/typeorm/entities/ProductPhoto';
import { v4 } from 'uuid';
import IProductPhotosRepository from '../IProductPhotosRepository';

class FakeProductPhotosRepository implements IProductPhotosRepository {
  private productPhotos: ProductPhoto[];

  constructor() {
    this.productPhotos = [];
  }

  public async findById(
    product_photo_id: string,
  ): Promise<ProductPhoto | undefined> {
    const productPhoto = this.productPhotos.find(
      prodPhoto => prodPhoto.id === product_photo_id,
    );
    return productPhoto;
  }

  public async findAll(product_id: string): Promise<ProductPhoto[]> {
    const productPhotos = this.productPhotos.filter(
      prodPhoto => prodPhoto.product_id === product_id,
    );
    return productPhotos;
  }

  public async create({
    name,
    path,
    product_id,
  }: ICreateProductPhotoDTO): Promise<ProductPhoto> {
    const productPhoto = new ProductPhoto();
    Object.assign(productPhoto, { id: v4(), name, path, product_id });
    this.productPhotos.push(productPhoto);
    return productPhoto;
  }

  public async delete(product_photo_id: string): Promise<void> {
    const index = this.productPhotos.findIndex(
      prodPhoto => prodPhoto.id === product_photo_id,
    );
    this.productPhotos.splice(index, 1);
  }
}

export default FakeProductPhotosRepository;
