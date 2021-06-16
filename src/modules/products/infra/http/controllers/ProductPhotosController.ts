import CreateProductPhotoService from '@modules/products/services/ProductPhotos/CreateProductPhotoService';
import DeleteProductPhotoService from '@modules/products/services/ProductPhotos/DeleteProductPhotoService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ProductPhotosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const employee_id = request.employee.id;
    const { originalname, filename } = request.file;
    const { product_id } = request.params;
    console.log(request.file);

    const productPhotoService = container.resolve(CreateProductPhotoService);
    const productPhoto = await productPhotoService.execute({
      employee_id,
      originalName: originalname,
      nameFile: filename,
      product_id,
    });
    return response.json(classToClass(productPhoto));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const employee_id = request.employee.id;
    const { product_photo_id } = request.params;

    const deleteProductPhotoService = container.resolve(
      DeleteProductPhotoService,
    );
    await deleteProductPhotoService.execute({ employee_id, product_photo_id });
    return response.json({ message: 'Product was deleted' });
  }
}
export default ProductPhotosController;
