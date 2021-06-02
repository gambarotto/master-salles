import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductsRepository,
  ) {}

  async execute(product_id: string): Promise<Product> {
    const product = await this.productRepository.findById({ product_id });
    if (!product) {
      throw new AppError('Product not found');
    }
    return product;
  }
}
export default ShowProductService;
