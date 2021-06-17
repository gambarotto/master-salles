import ICreateStatusDTO from '@modules/orders/dtos/ICreateStatusDTO';
import Status from '@modules/orders/infra/typeorm/entities/Status';
import { v4 } from 'uuid';
import IStatusRepository from '../IStatusRepository';

class FakeStatusRepository implements IStatusRepository {
  private statuses: Status[];

  constructor() {
    this.statuses = [];
  }

  public async findByName(name: string): Promise<Status | undefined> {
    const status = this.statuses.find(st => st.name === name);
    return status;
  }

  public async findById(id: string): Promise<Status | undefined> {
    const status = this.statuses.find(st => st.id === id);
    return status;
  }

  public async findAll(): Promise<Status[]> {
    return this.statuses;
  }

  public async create({
    name,
    description,
  }: ICreateStatusDTO): Promise<Status> {
    const status = new Status();
    Object.assign(status, { id: v4(), name, description });
    this.statuses.push(status);
    return status;
  }

  public async update(status: Status): Promise<Status> {
    const index = this.statuses.findIndex(st => st.id === status.id);
    this.statuses[index] = status;
    return this.statuses[index];
  }

  public async delete(status_id: string): Promise<void> {
    const index = this.statuses.findIndex(st => st.id === status_id);
    this.statuses.splice(index, 1);
  }
}
export default FakeStatusRepository;
