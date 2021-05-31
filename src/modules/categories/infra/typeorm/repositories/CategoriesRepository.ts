import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  async create(name: string): Promise<Category> {}

  async update(category: Category): Promise<Category> {}

  async delete(category_id: string): Promise<void> {}

  async findByName(name: string): Promise<Category | undefined> {}

  async findById(category_id: string): Promise<Category | undefined> {}

  async findAllCategories(): Promise<Category[]> {}
}
export default CategoriesRepository;
