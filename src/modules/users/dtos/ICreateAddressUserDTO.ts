import User from '../infra/typeorm/entities/User';

export default interface ICreateAddressUserDto {
  user: User;
  street: string;
  number: string;
  district: string;
  city: string;
  zipCode: string;
  complement: string;
  referencePoint: string;
  alias: string;
}
