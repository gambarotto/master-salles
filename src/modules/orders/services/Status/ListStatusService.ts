import Status from '@modules/orders/infra/typeorm/entities/Status';
import IStatusRepository from '@modules/orders/repositories/IStatusRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListStatusService {
  constructor(
    @inject('StatusRepository')
    private statusRepository: IStatusRepository,
  ) {}

  public async execute(): Promise<Status[]> {
    const status = await this.statusRepository.findAll();
    return status;
  }
}
export default ListStatusService;
