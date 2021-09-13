import UpdateCategoryImageService from '@modules/categories/services/UpdateCategoryImageService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ImageCategoryController {
  public async update(request: Request, response: Response): Promise<Response> {
    const employee_id = request.employee.id;
    const { category_id } = request.params;
    const fileName = request.file.filename;

    const updateCategoryImage = container.resolve(UpdateCategoryImageService);
    const category = await updateCategoryImage.execute({
      employee_id,
      category_id,
      categoryFileName: fileName,
    });

    return response.json(classToClass(category));
  }
}
export default ImageCategoryController;
