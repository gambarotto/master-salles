import Status from '../infra/typeorm/entities/Status';

export default interface ICreateOrderDTO {
  user_id: string;
  amount: number;
  status: Status[];
  delivery: boolean;
  delivery_fee: number;
  billing_address_id: string;
  shipping_address_id: string;
  order_product: string[];
}
