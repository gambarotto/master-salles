import AppError from '@shared/errors/AppError';
import axios from 'axios';
import ICreateTransationCCDTO from '../dtos/ICreateTransationCCDTO';
import IResponseTransactionDTO from '../dtos/IResponseTransaction';
import IGatewayProvider from '../models/IGatewayProvider';

class Pagarme implements IGatewayProvider {
  private urlPagarme: string;

  private api_key: string | undefined;

  constructor() {
    this.urlPagarme = 'https://api.pagar.me/1';
    this.api_key = process.env.API_KEY_PAGARME;
  }

  public async createTransaction({
    amount,
    credit_card,
    card_hash,
    card_id,
    customer,
    billing,
    shipping,
    items,
  }: ICreateTransationCCDTO): Promise<IResponseTransactionDTO | undefined> {
    try {
      const transactionData = {
        api_key: this.api_key,
        amount,
        ...credit_card,
        card_hash,
        card_id,
        customer,
        billing,
        shipping,
        items,
      };

      const response = await axios.post(
        `${this.urlPagarme}/transactions`,
        transactionData,
      );

      if (!response.data.authorization_code) {
        throw new AppError('Transaction refused');
      }

      const {
        acquirer_id,
        acquirer_name,
        acquirer_response_code,
        amount: transaction_amount,
        status,
        refuse_reason,
        status_reason,
        authorization_code,
        tid,
        payment_method,
        card,
      } = response.data;
      return {
        acquirer_id,
        acquirer_name,
        acquirer_response_code,
        transaction_amount,
        status,
        refuse_reason,
        status_reason,
        authorization_code,
        tid,
        payment_method,
        card,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppError(error.message, error.statusCode);
      }
      throw new AppError(error.response.data);
    }
  }
}
export default Pagarme;
