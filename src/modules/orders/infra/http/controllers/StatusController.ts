import CreateStatusService from '@modules/orders/services/Status/CreateStatusService';
import DeleteStatusService from '@modules/orders/services/Status/DeleteStatusService';
import ListStatusService from '@modules/orders/services/Status/ListStatusService';
import ShowStatusService from '@modules/orders/services/Status/ShowStatusService';
import UpdateStatusService from '@modules/orders/services/Status/UpdateStatusService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class StatusController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createStatusService = container.resolve(CreateStatusService);
    const status = await createStatusService.execute({ name, description });
    return response.json(status);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const { status_id } = request.params;

    const updateStatusService = container.resolve(UpdateStatusService);
    const status = await updateStatusService.execute({
      status_id,
      name,
      description,
    });
    return response.json(status);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { status_id } = request.params;

    const showStatusService = container.resolve(ShowStatusService);
    const status = await showStatusService.execute(status_id);
    return response.json(status);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listStatusService = container.resolve(ListStatusService);
    const status = await listStatusService.execute();
    return response.json(status);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { status_id } = request.params;

    const deleteStatusService = container.resolve(DeleteStatusService);
    await deleteStatusService.execute(status_id);
    return response.json({ message: 'Success on delete status' });
  }
}
export default StatusController;
