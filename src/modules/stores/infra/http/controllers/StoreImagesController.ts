import CreateStoreImageService from '@modules/stores/services/StoreImages/CreateStoreImageService';
import DeleteStoreImageService from '@modules/stores/services/StoreImages/DeleteStoreImageService';
import ListStoreImageService from '@modules/stores/services/StoreImages/ListStoreImageService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class StoreImagesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const nameFile = request.file.filename;
    const { store_id } = request.params;
    const employee_id = request.employee.id;

    const createStoreImage = container.resolve(CreateStoreImageService);
    const storeImage = await createStoreImage.execute({
      employee_id,
      store_id,
      nameFile,
    });

    return response.json(storeImage);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { store_id } = request.params;
    const listStoreImage = container.resolve(ListStoreImageService);
    const storeImages = await listStoreImage.execute(store_id);
    return response.json(classToClass(storeImages));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { store_image_id } = request.params;
    const employee_id = request.employee.id;

    const deleteStoreImage = container.resolve(DeleteStoreImageService);
    await deleteStoreImage.execute({ employee_id, store_image_id });
    return response.json({ message: 'Image was deleted' });
  }
}
export default StoreImagesController;
