import Status from '@modules/orders/infra/typeorm/entities/Status';
import IStatusRepository from '@modules/orders/repositories/IStatusRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowStatusService {
  constructor(
    @inject('StatusRepository')
    private statusRepository: IStatusRepository,
  ) {}

  public async execute(id: string): Promise<Status> {
    const status = await this.statusRepository.findById(id);
    if (!status) {
      throw new AppError('Status not found');
    }
    return status;
  }
}
export default ShowStatusService;
