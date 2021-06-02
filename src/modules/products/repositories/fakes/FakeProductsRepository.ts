import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IFindProductByIdDTO from '@modules/products/dtos/IFindProductByIdDTO';
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

  async update(product: Product): Promise<Product> {
    const productIndex = this.products.findIndex(
      prod => prod.id === product.id,
    );
    this.products[productIndex] = product;
    return this.products[productIndex];
  }

  async delete(product_id: string): Promise<void> {
    const productIndex = this.products.findIndex(
      prod => prod.id === product_id,
    );
    this.products.splice(productIndex, 1);
  }

  async findById(data: IFindProductByIdDTO): Promise<Product | undefined> {
    const product = this.products.find(prod => prod.id === data.product_id);
    return product;
  }

  async findByName(name: string): Promise<Product | undefined> {
    const product = this.products.find(prod => prod.name === name);
    return product;
  }

  async findAllProducts(): Promise<Product[]> {
    return this.products;
  }
}
export default FakeProductsRepository;
