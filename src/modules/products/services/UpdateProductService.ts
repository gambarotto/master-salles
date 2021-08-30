/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
import Category from '@modules/categories/infra/typeorm/entities/Category';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  employee_id: string;
  product_id: string;
  name?: string;
  package_quantity?: string;
  description?: string;
  cost_price?: number;
  sale_price?: number;
  categories_ids?: string[];
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductsRepository,
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({
    employee_id,
    product_id,
    name,
    package_quantity,
    description,
    cost_price,
    sale_price,
    categories_ids,
  }: IRequest): Promise<Product> {
    const employee = await this.employeesRepository.findById(employee_id);
    if (!employee) {
      throw new AppError('Employee not found');
    }
    if (employee.responsibility !== 'admin') {
      throw new AppError('The Employee has no privilegies to do this');
    }

    const product = await this.productRepository.findById({
      product_id,
      relations: ['category_id'],
    });
    if (!product) {
      throw new AppError('Product not found');
    }

    const categories: Category[] = [];

    if (categories_ids) {
      for await (const category_id of categories_ids) {
        const category = await this.categoriesRepository.findById({
          category_id,
        });
        if (!category) {
          throw new AppError(`Category ${category_id} not found`);
        }
        categories.push(category);
      }
    }

    Object.assign(product, {
      name: name || product.name,
      package: package_quantity || product.package,
      description: description || product.description,
      cost_price: cost_price || product.cost_price,
      sale_price: sale_price || product.sale_price,
      category_id: categories.length > 0 ? categories : product.category_id,
    });
    const productUpdated = await this.productRepository.update(product);

    return productUpdated;
  }
}
export default UpdateProductService;
