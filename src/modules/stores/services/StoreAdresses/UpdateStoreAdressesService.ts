import StoreAddress from '@modules/stores/infra/typeorm/entities/StoreAddress';
import IStoreAdressesRepository from '@modules/stores/repositories/IStoreAdressesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  storeId: string;
  street?: string;
  number?: string;
  district?: string;
  city?: string;
  zipCode?: string;
  complement?: string;
  referencePoint?: string;
  lat?: string;
  long?: string;
}

@injectable()
class UpdateStoreAdressesService {
  constructor(
    @inject('StoreAdressesRepository')
    private storeAdressesRepository: IStoreAdressesRepository,
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
    const storeAddress = await this.storeAdressesRepository.findByStoreId(
      storeId,
    );

    if (!storeAddress) {
      throw new AppError('Store Address not found');
    }

    Object.assign(storeAddress, {
      street: street || storeAddress.street,
      number: number || storeAddress.number,
      district: district || storeAddress.district,
      city: city || storeAddress.city,
      zipCode: zipCode || storeAddress.zipCode,
      complement: complement || storeAddress.complement,
      referencePoint: referencePoint || storeAddress.referencePoint,
      lat: lat || storeAddress.lat,
      long: long || storeAddress.long,
    });

    const storeUpdated = await this.storeAdressesRepository.update(
      storeAddress,
    );

    return storeUpdated;
  }
}
export default UpdateStoreAdressesService;
