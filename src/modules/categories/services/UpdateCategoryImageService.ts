import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import ICompressImageProvider from '@shared/container/providers/CompressImageProvider/models/ICompressImageProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  employee_id: string;
  category_id: string;
  categoryFileName: string;
}

@injectable()
class UpdateCategoryImageService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
    @inject('CompressImageProvider')
    private compressImageProvider: ICompressImageProvider,
  ) {}

  async execute({
    employee_id,
    category_id,
    categoryFileName,
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
    if (category.image) {
      await this.storageProvider.deleteFile({
        file: category.image,
        moduleName: 'categories',
      });
    }

    const compressedImage =
      await this.compressImageProvider.compressAndSaveImage({
        filename: categoryFileName,
        moduleName: 'categories',
      });

    await this.storageProvider.deleteFile({
      file: compressedImage[0].sourcePath,
      moduleName: 'categories',
    });

    category.image = categoryFileName;

    const updatedCategory = await this.categoriesRepository.update(category);

    return updatedCategory;
  }
}
export default UpdateCategoryImageService;
