/* eslint-disable no-restricted-syntax */
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  employee_id: string;
  name: string;
  package_quantity: string;
  description: string;
  cost_price: number;
  sale_price: number;
  categories_ids: string[];
}

@injectable()
class CreateProductService {
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
    const productAlreadyExists = await this.productRepository.findByName(name);
    if (productAlreadyExists) {
      throw new AppError('Already Exists a product with this name');
    }

    const categories = [];
    for await (const category_id of categories_ids) {
      const category = await this.categoriesRepository.findById({
        category_id,
      });
      if (!category) {
        throw new AppError(`Category ${category_id} not found`);
      }
      categories.push(category);
    }

    const product = await this.productRepository.create({
      name,
      package: package_quantity,
      description,
      cost_price,
      sale_price,
      category_id: categories,
    });

    return product;
  }
}
export default CreateProductService;
