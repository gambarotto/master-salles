import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateProductService from '@modules/products/services/CreateProductService';
import { classToClass } from 'class-transformer';
import ShowProductService from '@modules/products/services/ShowProductsService';
import ListProductService from '@modules/products/services/ListProductsService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';

class ProductController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      package_quantity,
      description,
      cost_price,
      sale_price,
      categories_ids,
    } = request.body;
    const employee_id = request.employee.id;
    const createProduct = container.resolve(CreateProductService);
    const product = await createProduct.execute({
      employee_id,
      name,
      package_quantity,
      description,
      cost_price,
      sale_price,
      categories_ids,
    });

    return response.json(classToClass(product));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;
    const showProduct = container.resolve(ShowProductService);
    const product = await showProduct.execute(product_id);

    return response.json(classToClass(product));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductService);
    const products = await listProducts.execute();

    return response.json(classToClass(products));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, description, cost_price, sale_price, categories_ids } =
      request.body;
    const { product_id } = request.params;
    const employee_id = request.employee.id;

    const updateProductn = container.resolve(UpdateProductService);
    const product = await updateProductn.execute({
      employee_id,
      product_id,
      name,
      description,
      cost_price,
      sale_price,
      categories_ids,
    });
    return response.json(classToClass(product));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;
    const employee_id = request.employee.id;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute({ employee_id, product_id });

    return response.json({ message: 'Product was deleted' });
  }
}
export default ProductController;
