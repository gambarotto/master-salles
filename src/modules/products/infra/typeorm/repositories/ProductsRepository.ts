import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import { getRepository, Repository } from 'typeorm';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  async create(data: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(data);
    const productCreated = await this.ormRepository.save(product);
    return productCreated;
  }

  async findById(product_id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(product_id);
    return product;
  }

  async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({ where: { name } });
    return product;
  }
}
export default ProductsRepository;
