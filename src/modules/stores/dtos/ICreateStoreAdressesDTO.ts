import Store from '../infra/typeorm/entities/Store';

export default interface ICreateStoreAdressesDTO {
  storeId: string;
  store: Store;
  street: string;
  number: string;
  district: string;
  city: string;
  zipCode: string;
  complement: string;
  referencePoint: string;
  lat: number;
  long: number;
}
