import Category from '@modules/categories/infra/typeorm/entities/Category';

export default interface ICreateProductDTO {
  name: string;
  package: string;
  description: string;
  cost_price: number;
  sale_price: number;
  category_id: Category[];
}
