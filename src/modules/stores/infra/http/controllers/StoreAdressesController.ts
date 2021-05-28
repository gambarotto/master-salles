import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateStoreAdressesService from '@modules/stores/services/StoreAdresses/CreateStoreAdressesService';
import DeleteStoreAdressesService from '@modules/stores/services/StoreAdresses/DeleteStoreAdressesService';
import ShowStoreAdressesService from '@modules/stores/services/StoreAdresses/ShowStoreAdressesService';
import UpdateStoreAdressesService from '@modules/stores/services/StoreAdresses/UpdateStoreAdressesService';

class StoreAdressesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      street,
      number,
      district,
      city,
      zipCode,
      complement,
      referencePoint,
      lat,
      long,
    } = request.body;

    const { store_id } = request.params;

    const createStoreAdresses = container.resolve(CreateStoreAdressesService);

    const storeAddress = await createStoreAdresses.execute({
      store_id,
      street,
      number,
      district,
      city,
      zipCode,
      complement,
      referencePoint,
      lat,
      long,
    });

    return response.json(storeAddress);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { store_id } = request.params;

    const showStoreAdresses = container.resolve(ShowStoreAdressesService);

    const storeAddress = await showStoreAdresses.execute(store_id);

    return response.json(storeAddress);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      street,
      number,
      district,
      city,
      zipCode,
      complement,
      referencePoint,
      lat,
      long,
    } = request.body;

    const { store_id } = request.params;

    const updateStoreAdresses = container.resolve(UpdateStoreAdressesService);

    const storeAddress = await updateStoreAdresses.execute({
      store_id,
      street,
      number,
      district,
      city,
      zipCode,
      complement,
      referencePoint,
      lat,
      long,
    });

    return response.json(storeAddress);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { store_id } = request.params;

    const deleteStoreAdresses = container.resolve(DeleteStoreAdressesService);

    await deleteStoreAdresses.execute(store_id);

    return response.json({ message: 'Store Address was deteted' });
  }
}
export default StoreAdressesController;
