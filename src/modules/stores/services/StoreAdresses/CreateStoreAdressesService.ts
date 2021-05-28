import StoreAddress from '@modules/stores/infra/typeorm/entities/StoreAddress';
import IStoreAdressesRepository from '@modules/stores/repositories/IStoreAdressesRepository';
import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  store_id: string;
  street: string;
  number: string;
  district: string;
  city: string;
  zip_code: string;
  complement: string;
  reference_point: string;
  lat: string;
  long: string;
}

@injectable()
class CreateStoreAdressesService {
  constructor(
    @inject('StoreAdressesRepository')
    private storeAdressesRepository: IStoreAdressesRepository,
    @inject('StoresRepository')
    private storeRepository: IStoresRepository,
  ) {}

  public async execute({
    store_id,
    street,
    number,
    district,
    city,
    zip_code,
    complement,
    reference_point,
    lat,
    long,
  }: IRequest): Promise<StoreAddress> {
    const storeAlreadyExists = await this.storeRepository.findById({
      store_id,
      address: true,
    });
    if (!storeAlreadyExists) {
      throw new AppError('Store non-exists');
    }
    if (storeAlreadyExists.address) {
      throw new AppError('Store Address already exists');
    }

    const storeAddress = await this.storeAdressesRepository.create({
      store_id,
      street,
      number,
      district,
      city,
      zip_code,
      complement,
      reference_point,
      lat: Number(lat),
      long: Number(long),
    });
    return storeAddress;
  }
}
export default CreateStoreAdressesService;
