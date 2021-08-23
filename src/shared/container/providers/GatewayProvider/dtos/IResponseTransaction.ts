interface ICardPagarme {
  id: string;
  date_created: string;
  date_updated: string;
  brand: string;
  holder_name: string;
  first_digits: string;
  last_digits: string;
  country: string;
  fingerprint: string;
  valid: boolean;
  expiration_date: string;
}
export default interface IResponseTransactionDTO {
  acquirer_id: string;
  acquirer_name: string;
  acquirer_response_code: string;
  transaction_amount: number;
  status: string;
  refuse_reason: string;
  status_reason: string;
  authorization_code: string;
  tid: number;
  payment_method: string;
  card: ICardPagarme;
}
