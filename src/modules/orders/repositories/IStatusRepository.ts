import ICreateStatusDTO from '../dtos/ICreateStatusDTO';
import Status from '../infra/typeorm/entities/Status';

export default interface IStatusRepository {
  findByName(name: string): Promise<Status | undefined>;
  findById(id: string): Promise<Status | undefined>;
  findAll(): Promise<Status[]>;
  create({ name, description }: ICreateStatusDTO): Promise<Status>;
  update(status: Status): Promise<Status>;
}
