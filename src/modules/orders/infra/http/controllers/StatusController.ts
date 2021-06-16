import CreateStatusService from '@modules/orders/services/Status/CreateStatusService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class StatusController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createStatusService = container.resolve(CreateStatusService);
    const status = await createStatusService.execute({ name, description });
    return response.json(status);
  }
}
export default StatusController;
