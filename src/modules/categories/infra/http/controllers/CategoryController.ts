import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';
import ListCategoriesService from '@modules/categories/services/ListCategoriesService';
import ShowCategoryService from '@modules/categories/services/ShowCategoryService';
import UpdateCategoryService from '@modules/categories/services/UpdateCategoryService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CategoryController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const employee_id = request.employee.id;

    const createCategory = container.resolve(CreateCategoryService);
    const category = await createCategory.execute({ employee_id, name });

    return response.json(category);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;
    const showCategory = container.resolve(ShowCategoryService);

    const category = await showCategory.execute(category_id);

    return response.json(classToClass(category));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listCategories = container.resolve(ListCategoriesService);

    const categories = await listCategories.execute();
    return response.json(classToClass(categories));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { category_id } = request.params;
    const employee_id = request.employee.id;

    const updateCategory = container.resolve(UpdateCategoryService);
    const categoryUpdated = await updateCategory.execute({
      employee_id,
      category_id,
      name,
    });
    return response.json(categoryUpdated);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;
    const employee_id = request.employee.id;
    const deleteCategory = container.resolve(DeleteCategoryService);
    await deleteCategory.execute({ employee_id, category_id });

    return response.json({ message: 'Success on delete category' });
  }
}
export default CategoryController;
