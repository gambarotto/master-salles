import CreateStoreService from '@modules/stores/services/CreateStoreService';
import DeleteStoreService from '@modules/stores/services/DeleteStoreService';
import ListStoresService from '@modules/stores/services/ListStoresService';
import UpdateStoreService from '@modules/stores/services/UpdateStoreService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class StoreController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listStoresService = container.resolve(ListStoresService);
    const stores = await listStoresService.execute();

    return response.json(classToClass(stores));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, cnpj } = request.body;

    const createStore = container.resolve(CreateStoreService);
    const store = await createStore.execute({ name, description, cnpj });

    return response.json(classToClass(store));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { store_id } = request.params;
    const { name, description, cnpj } = request.body;
    const updateStoreService = container.resolve(UpdateStoreService);
    const storeUpdated = await updateStoreService.execute({
      store_id,
      name,
      description,
      cnpj,
    });
    return response.json(classToClass(storeUpdated));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { store_id } = request.params;
    const deleteStoreService = container.resolve(DeleteStoreService);
    await deleteStoreService.execute({ store_id });

    return response.json({ message: 'Store was deleted' });
  }
}
export default StoreController;
