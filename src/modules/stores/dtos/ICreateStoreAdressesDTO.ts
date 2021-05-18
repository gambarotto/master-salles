export default interface ICreateStoreAdressesDTO {
  store_id: string;
  street: string;
  number: string;
  district: string;
  city: string;
  zip_code: string;
  complement: string;
  reference_point: string;
  lat: number;
  long: number;
}
