import Status from '@modules/orders/infra/typeorm/entities/Status';
import IStatusRepository from '@modules/orders/repositories/IStatusRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  status_id: string;
  name?: string;
  description?: string;
}
@injectable()
class UpdateStatusService {
  constructor(
    @inject('StatusRepository')
    private statusRepository: IStatusRepository,
  ) {}

  public async execute({
    status_id,
    name,
    description,
  }: IRequest): Promise<Status> {
    const status = await this.statusRepository.findById(status_id);
    if (!status) {
      throw new AppError('Status not found');
    }
    if (name && name !== status.name) {
      const statusAlreadyExists = await this.statusRepository.findByName(name);
      if (statusAlreadyExists) {
        throw new AppError('Already exists a status with this name');
      }
    }
    Object.assign(status, {
      name: name || status.name,
      description: description || status.description,
    });
    const statusUpdated = await this.statusRepository.update(status);
    return statusUpdated;
  }
}
export default UpdateStatusService;
