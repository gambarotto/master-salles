import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateProductService from '@modules/products/services/CreateProductService';
import { classToClass } from 'class-transformer';

class ProductController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, description, cost_price, sale_price, categories_ids } =
      request.body;
    const employee_id = request.employee.id;
    const createProduct = container.resolve(CreateProductService);
    const product = await createProduct.execute({
      employee_id,
      name,
      description,
      cost_price,
      sale_price,
      categories_ids,
    });

    return response.json(classToClass(product));
  }
}
export default ProductController;
