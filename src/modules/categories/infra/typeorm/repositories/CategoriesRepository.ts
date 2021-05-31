import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import { getRepository, Repository } from 'typeorm';
import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  async create(name: string): Promise<Category> {
    const category = this.ormRepository.create({ name });
    await this.ormRepository.save(category);
    return category;
  }

  async update(category: Category): Promise<Category> {}

  async delete(category_id: string): Promise<void> {}

  async findByName(name: string): Promise<Category | undefined> {}

  async findById(category_id: string): Promise<Category | undefined> {}

  async findAllCategories(): Promise<Category[]> {}
}
export default CategoriesRepository;
