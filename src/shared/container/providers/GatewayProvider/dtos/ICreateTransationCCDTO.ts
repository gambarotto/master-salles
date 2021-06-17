interface ICreditCardPagarme {
  card_number: string;
  card_holder_name: string;
  card_expiration_date: string;
  card_cvv: string;
}
interface ICustomerPagarme {
  external_id: string;
  name: string;
  type: string;
  country: string;
  email: string;
  documents: [
    {
      type: 'cpf' | 'cnpj';
      number: string;
    },
  ];
  phone_numbers: string[];
  birthday: Date;
}
interface IAddressPagarme {
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  street_number: string;
  zipcode: string;
}
interface IItemsPagarme {
  id: string;
  title: string;
  unit_price: number;
  quantity: number;
  tangible: boolean;
}
export default interface ICreateTransationCCDTO {
  amount: string;
  credit_card: ICreditCardPagarme;
  customer: ICustomerPagarme;
  billing: {
    name: string;
    address: IAddressPagarme;
  };
  shipping: {
    name: string;
    fee: number;
    delivery_date: Date;
    expedited: boolean;
    address: IAddressPagarme;
  };
  items: IItemsPagarme[];
}
