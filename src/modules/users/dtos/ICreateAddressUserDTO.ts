export default interface ICreateAddressUserDto {
  user_id: string;
  street: string;
  number: string;
  district: string;
  city: string;
  zip_code: string;
  complement: string;
  reference_point: string;
  alias: string;
  default: boolean;
}
