import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductsRepository,
  ) {}

  async execute(): Promise<Product[]> {
    const product = await this.productRepository.findAllProducts();

    return product;
  }
}
export default ListProductService;
