import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Store from '../infra/typeorm/entities/Store';
import IStoresRepository from '../repositories/IStoresRepository';

interface IRequest {
  storeId: string;
  name?: string;
  description?: string;
  cnpj?: string;
}

@injectable()
class UpdateStoreService {
  constructor(
    @inject('StoresRepository')
    private storeRepository: IStoresRepository,
  ) {}

  public async execute({
    storeId,
    name,
    description,
    cnpj,
  }: IRequest): Promise<Store> {
    const store = await this.storeRepository.findById({
      storeId,
    });

    if (!store) {
      throw new AppError('Store not found');
    }
    if (cnpj && cnpj !== store.cnpj) {
      const storeAlreadyExists = await this.storeRepository.findByCnpj(cnpj);

      if (storeAlreadyExists) {
        throw new AppError('Already have a store with this cnpj');
      }
      store.cnpj = cnpj;
    }
    Object.assign(store, {
      name: name || store.name,
      description: description || store.description,
    });

    const storeUpdated = await this.storeRepository.update(store);

    return storeUpdated;
  }
}
export default UpdateStoreService;
