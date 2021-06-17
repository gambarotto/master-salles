import ICreateStatusDTO from '@modules/orders/dtos/ICreateStatusDTO';
import IStatusRepository from '@modules/orders/repositories/IStatusRepository';
import { getRepository, Repository } from 'typeorm';
import Status from '../entities/Status';

class StatusRepository implements IStatusRepository {
  private ormRepository: Repository<Status>;

  constructor() {
    this.ormRepository = getRepository(Status);
  }

  public async findByName(name: string): Promise<Status | undefined> {
    const status = await this.ormRepository.findOne({ where: { name } });
    return status;
  }

  public async findById(id: string): Promise<Status | undefined> {
    const status = await this.ormRepository.findOne(id);
    return status;
  }

  public async findAll(): Promise<Status[]> {
    const statuses = await this.ormRepository.find();
    return statuses;
  }

  public async create({
    name,
    description,
  }: ICreateStatusDTO): Promise<Status> {
    const status = this.ormRepository.create({ name, description });
    const statusCreated = await this.ormRepository.save(status);
    return statusCreated;
  }

  public async update(status: Status): Promise<Status> {
    const statusUpdated = await this.ormRepository.save(status);
    return statusUpdated;
  }

  public async delete(status_id: string): Promise<void> {
    await this.ormRepository.delete(status_id);
  }
}
export default StatusRepository;
