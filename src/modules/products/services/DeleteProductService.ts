import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  employee_id: string;
  product_id: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductsRepository,
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
  ) {}

  async execute({ employee_id, product_id }: IRequest): Promise<Product> {
    const employee = await this.employeesRepository.findById(employee_id);
    if (!employee) {
      throw new AppError('Employee not found');
    }
    if (employee.responsibility !== 'admin') {
      throw new AppError('The Employee has no privilegies to do this');
    }

    const product = await this.productRepository.findById({ product_id });
    if (!product) {
      throw new AppError('Product not found');
    }
    await this.productRepository.delete(product_id);
    return product;
  }
}
export default DeleteProductService;
