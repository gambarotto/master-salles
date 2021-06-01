import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductsRepository {
  findById(product_id: string): Promise<Product | undefined>;
  findByName(name: string): Promise<Product | undefined>;
  create(data: ICreateProductDTO): Promise<Product>;
}
