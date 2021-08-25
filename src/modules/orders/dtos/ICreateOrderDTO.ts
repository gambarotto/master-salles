import Status from '../infra/typeorm/entities/Status';

export interface IOrderProduct {
  id: string;
  title: string;
  unit_price: number;
  quantity: number;
  tangible: boolean;
}

export default interface ICreateOrderDTO {
  user_id: string;
  amount: number;
  status: Status[];
  delivery: boolean;
  delivery_fee: number;
  billing_address_id: string;
  shipping_address_id: string;
  transaction_id?: string;
  order_product: IOrderProduct[];
}
