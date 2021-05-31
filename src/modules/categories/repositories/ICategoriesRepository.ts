import Category from '../infra/typeorm/entities/Category';

export default interface ICategoriesRepository {
  findByName(name: string): Promise<Category | undefined>;
  findById(category_id: string): Promise<Category | undefined>;
  findAllCategories(): Promise<Category[]>;
  create(name: string): Promise<Category>;
  update(category: Category): Promise<Category>;
  delete(category_id: string): Promise<void>;
}
