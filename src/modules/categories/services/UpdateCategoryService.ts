import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  employee_id: string;
  category_id: string;
  name: string;
}

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
  ) {}

  async execute({
    employee_id,
    category_id,
    name,
  }: IRequest): Promise<Category> {
    const employee = await this.employeesRepository.findById(employee_id);
    if (!employee) {
      throw new AppError('Employee not found');
    }
    if (employee.responsibility !== 'admin') {
      throw new AppError('The Employee has no privilegies to do this');
    }
    const category = await this.categoriesRepository.findById({ category_id });
    if (!category) {
      throw new AppError('Category not found');
    }
    if (name !== category.name) {
      const categoryAlreadyExists = await this.categoriesRepository.findByName(
        name,
      );
      if (categoryAlreadyExists) {
        throw new AppError('Already exists category with this name');
      }
    }
    Object.assign(category, { name });
    const categoryUpdated = await this.categoriesRepository.update(category);
    return categoryUpdated;
  }
}
export default UpdateCategoryService;
