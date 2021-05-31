import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

@injectable()
class ShowCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(category_id: string): Promise<Category> {
    const category = await this.categoriesRepository.findById(category_id);

    if (!category) {
      throw new AppError('Category not found');
    }

    return category;
  }
}
export default ShowCategoryService;
