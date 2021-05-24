import StoreAddress from '@modules/stores/infra/typeorm/entities/StoreAddress';
import IStoreAdressesRepository from '@modules/stores/repositories/IStoreAdressesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  store_id: string;
  street?: string;
  number?: string;
  district?: string;
  city?: string;
  zip_code?: string;
  complement?: string;
  reference_point?: string;
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
    const storeAddress = await this.storeAdressesRepository.findByStoreId(
      store_id,
    );

    if (!storeAddress) {
      throw new AppError('Store Address not found');
    }

    Object.assign(storeAddress, {
      street: street || storeAddress.street,
      number: number || storeAddress.number,
      district: district || storeAddress.district,
      city: city || storeAddress.city,
      zip_code: zip_code || storeAddress.zip_code,
      complement: complement || storeAddress.complement,
      reference_point: reference_point || storeAddress.reference_point,
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
