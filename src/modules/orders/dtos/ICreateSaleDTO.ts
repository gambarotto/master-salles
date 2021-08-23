import IResponseTransactionDTO from '@shared/container/providers/GatewayProvider/dtos/IResponseTransaction';

interface IItem {
  product: {
    id: string;
    name: string;
    description: string;
    sale_price: number;
  };
  quantity: number;
}

export default interface ICreateSaleDTO {
  amount: number;
  delivery_fee: number;
  delivery: boolean;
  shipping_address_id: string;
  billing_address_id: string;
  user_id: string;
  cardId: string | undefined;
  transactionData: IResponseTransactionDTO;
  items: IItem[];
}
