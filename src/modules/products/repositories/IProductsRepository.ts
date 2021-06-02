import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IFindProductByIdDTO from '../dtos/IFindProductByIdDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductsRepository {
  findById(data: IFindProductByIdDTO): Promise<Product | undefined>;
  findAllProducts(): Promise<Product[]>;
  findByName(name: string): Promise<Product | undefined>;
  create(data: ICreateProductDTO): Promise<Product>;
  update(product: Product): Promise<Product>;
  delete(product_id: string): Promise<void>;
}
