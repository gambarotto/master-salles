import IFindCategoryDTO from '@modules/categories/dtos/IFindCategoryDTO';
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

  async update(category: Category): Promise<Category> {
    const categoryUpdated = await this.ormRepository.save(category);
    return categoryUpdated;
  }

  async delete(category_id: string): Promise<void> {
    await this.ormRepository.delete(category_id);
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({ where: { name } });
    return category;
  }

  async findById({
    category_id,
    products = false,
  }: IFindCategoryDTO): Promise<Category | undefined> {
    let category;
    if (products) {
      category = await this.ormRepository.findOne(category_id, {
        relations: ['product_id'],
      });
    } else {
      category = await this.ormRepository.findOne(category_id);
    }
    return category;
  }

  async findAllCategories(): Promise<Category[]> {
    const categories = await this.ormRepository.find();
    return categories;
  }
}
export default CategoriesRepository;
