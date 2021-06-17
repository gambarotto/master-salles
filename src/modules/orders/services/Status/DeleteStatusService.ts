import { inject, injectable } from 'tsyringe';
import IStatusRepository from '@modules/orders/repositories/IStatusRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteStatusService {
  constructor(
    @inject('StatusRepository')
    private statusRepository: IStatusRepository,
  ) {}

  public async execute(status_id: string): Promise<void> {
    const status = await this.statusRepository.findById(status_id);
    if (!status) {
      throw new AppError('Status not found');
    }
    await this.statusRepository.delete(status_id);
  }
}
export default DeleteStatusService;
