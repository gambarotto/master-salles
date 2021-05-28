export default interface ICreateStoreAdressesDTO {
  store_id: string;
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
