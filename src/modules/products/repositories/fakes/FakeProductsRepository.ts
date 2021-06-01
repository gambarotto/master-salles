import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import Product from '@modules/products/infra/typeorm/entities/Product';
import { v4 } from 'uuid';
import IProductsRepository from '../IProductsRepository';

class FakeProductsRepository implements IProductsRepository {
  private products: Product[];

  constructor() {
    this.products = [];
  }

  async create(data: ICreateProductDTO): Promise<Product> {
    const product = new Product();
    Object.assign(product, { id: v4() }, data);
    this.products.push(product);
    return product;
  }

  async findById(product_id: string): Promise<Product | undefined> {
    const product = this.products.find(prod => prod.id === product_id);
    return product;
  }

  async findByName(name: string): Promise<Product | undefined> {
    const product = this.products.find(prod => prod.name === name);
    return product;
  }
}
export default FakeProductsRepository;
