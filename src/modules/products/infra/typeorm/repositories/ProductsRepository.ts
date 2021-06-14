import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IFindProductByIdDTO from '@modules/products/dtos/IFindProductByIdDTO';
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

  async update(product: Product): Promise<Product> {
    const productUpdated = await this.ormRepository.save(product);
    return productUpdated;
  }

  async delete(product_id: string): Promise<void> {
    await this.ormRepository.delete(product_id);
  }

  async findById({
    product_id,
    relations = [],
  }: IFindProductByIdDTO): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(product_id, {
      relations,
    });
    return product;
  }

  async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({ where: { name } });
    return product;
  }

  async findAllProducts(): Promise<Product[]> {
    const products = await this.ormRepository.find({
      relations: ['category_id'],
    });

    return products;
  }
}
export default ProductsRepository;
