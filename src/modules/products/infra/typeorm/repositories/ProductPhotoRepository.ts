import ICreateProductPhotoDTO from '@modules/products/dtos/ICreateProductPhotoDTO';
import ProductPhoto from '@modules/products/infra/typeorm/entities/ProductPhoto';
import IProductPhotosRepository from '@modules/products/repositories/IProductPhotosRepository';
import { getRepository, Repository } from 'typeorm';

class ProductPhotosRepository implements IProductPhotosRepository {
  private ormRepository: Repository<ProductPhoto>;

  constructor() {
    this.ormRepository = getRepository(ProductPhoto);
  }

  public async findById(
    product_photo_id: string,
  ): Promise<ProductPhoto | undefined> {
    const productPhoto = await this.ormRepository.findOne(product_photo_id);
    return productPhoto;
  }

  public async findAll(product_id: string): Promise<ProductPhoto[]> {
    const productPhotos = await this.ormRepository.find({
      where: { product_id },
    });
    return productPhotos;
  }

  public async create({
    name,
    path,
    product_id,
  }: ICreateProductPhotoDTO): Promise<ProductPhoto> {
    const productPhoto = this.ormRepository.create({ name, path, product_id });
    const productPhotoCreated = await this.ormRepository.save(productPhoto);
    return productPhotoCreated;
  }

  public async delete(product_photo_id: string): Promise<void> {
    await this.ormRepository.delete(product_photo_id);
  }
}

export default ProductPhotosRepository;
