import Category from '@modules/categories/infra/typeorm/entities/Category';
import { v4 } from 'uuid';
import ICategoriesRepository from '../ICategoriesRepository';

class FakeCategoriesRepository implements ICategoriesRepository {
  categories: Category[];

  constructor() {
    this.categories = [];
  }

  async create(name: string): Promise<Category> {
    const category = new Category();
    Object.assign(category, { id: v4(), name });
    this.categories.push(category);
    return category;
  }

  async update(category: Category): Promise<Category> {
    const categoryIndex = this.categories.findIndex(
      cat => cat.id === category.id,
    );
    this.categories[categoryIndex] = category;
    return this.categories[categoryIndex];
  }

  async delete(category_id: string): Promise<void> {
    const categoryIndex = this.categories.findIndex(
      cat => cat.id === category_id,
    );
    this.categories.splice(categoryIndex, 1);
  }

  async findByName(name: string): Promise<Category | undefined> {
    const categoryFinded = this.categories.find(cat => cat.name === name);
    return categoryFinded;
  }

  async findById(category_id: string): Promise<Category | undefined> {
    const categoryFinded = this.categories.find(cat => cat.id === category_id);
    return categoryFinded;
  }

  async findAllCategories(): Promise<Category[]> {
    return this.categories;
  }
}
export default FakeCategoriesRepository;
