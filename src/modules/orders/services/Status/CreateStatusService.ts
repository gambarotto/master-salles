import Status from '@modules/orders/infra/typeorm/entities/Status';
import IStatusRepository from '@modules/orders/repositories/IStatusRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateStatusService {
  constructor(
    @inject('StatusRepository')
    private statusRepository: IStatusRepository,
  ) {}

  public async execute({ name, description }: IRequest): Promise<Status> {
    const statusAlreadyExists = await this.statusRepository.findByName(name);
    if (statusAlreadyExists) {
      throw new AppError('Already exists a status with this name');
    }
    const status = await this.statusRepository.create({ name, description });
    return status;
  }
}
export default CreateStatusService;
