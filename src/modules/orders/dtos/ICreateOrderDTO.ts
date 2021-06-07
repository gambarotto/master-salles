export default interface ICreateOrderDTO {
  user_id: string;
  billing_address_id: string;
  shipping_address_id: string;
  status: string;
  method_payment_id?: string;
  delivery: boolean;
  transaction_id?: string;
  total: number;
}
