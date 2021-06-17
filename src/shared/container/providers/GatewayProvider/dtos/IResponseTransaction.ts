export default interface IResponseTransactionDTO {
  status: string;
  refuse_reason: string;
  status_reason: string;
  authorization_code: string;
  tid: number;
  payment_method: string;
}
