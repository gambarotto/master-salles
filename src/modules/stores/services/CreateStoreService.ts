import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateStoreDTO from '../dtos/ICreateStoreDTO';
import Store from '../infra/typeorm/entities/Store';
import IStoresRepository from '../repositories/IStoresRepository';

@injectable()
class CreateStoreService {
  constructor(
    @inject('StoresRepository')
    private storeRepository: IStoresRepository,
  ) {}

  public async execute({
    name,
    description,
    cnpj,
  }: ICreateStoreDTO): Promise<Store> {
    const storeAlreadyExists = await this.storeRepository.findByCnpj(cnpj);

    if (storeAlreadyExists) {
      throw new AppError('Store already exists');
    }
    const store = await this.storeRepository.create({
      name,
      description,
      cnpj,
    });
    return store;
  }
}
export default CreateStoreService;
