import StoreAddress from '@modules/stores/infra/typeorm/entities/StoreAddress';
import IStoreAdressesRepository from '@modules/stores/repositories/IStoreAdressesRepository';
import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  storeId: string;
  street: string;
  number: string;
  district: string;
  city: string;
  zipCode: string;
  complement: string;
  referencePoint: string;
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
    storeId,
    street,
    number,
    district,
    city,
    zipCode,
    complement,
    referencePoint,
    lat,
    long,
  }: IRequest): Promise<StoreAddress> {
    const storeAlreadyExists = await this.storeRepository.findById({
      storeId,
      address: true,
    });
    if (!storeAlreadyExists) {
      throw new AppError('Store non-exists');
    }
    if (storeAlreadyExists.address) {
      throw new AppError('Store Address already exists');
    }

    const storeAddress = await this.storeAdressesRepository.create({
      storeId,
      store: storeAlreadyExists,
      street,
      number,
      district,
      city,
      zipCode,
      complement,
      referencePoint,
      lat: Number(lat),
      long: Number(long),
    });
    return storeAddress;
  }
}
export default CreateStoreAdressesService;
