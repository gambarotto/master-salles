/* eslint-disable @typescript-eslint/ban-ts-comment */
import PaymentCard from '@modules/orders/infra/typeorm/entities/PaymentCard';
import AppError from '@shared/errors/AppError';
import axios from 'axios';
import ICreateTransationCCDTO from '../dtos/ICreateTransationCCDTO';
import IResponsePaymentCardDTO from '../dtos/IResponsePaymentCardDTO';
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
    card_hash,
    card_id,
    customer,
    billing,
    shipping,
    items,
  }: ICreateTransationCCDTO): Promise<IResponseTransactionDTO> {
    if (!card_hash && !card_id) {
      throw new AppError('Missing card data', 400);
    }
    try {
      const transactionData = {
        api_key: this.api_key,
        amount,
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
        throw new AppError('Transaction refused, verify data card', 401);
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
      // @ts-ignore
      throw new AppError(error.response.data, 400);
    }
  }

  public async getCreditCards(
    payment_cards: PaymentCard[],
  ): Promise<IResponsePaymentCardDTO[]> {
    const data = { api_key: this.api_key };
    try {
      const cardsPagarme = payment_cards.map(async card => {
        const cardPagarme = await axios.get(
          `${this.urlPagarme}/cards/${card.card_id}`,
          { params: data },
        );
        return cardPagarme;
      });
      const promises = await Promise.all(cardsPagarme);
      const response = promises.map(promise => {
        const {
          id,
          brand,
          holder_name,
          first_digits,
          last_digits,
          expiration_date,
        } = promise.data;
        return {
          id,
          brand,
          holder_name,
          first_digits,
          last_digits,
          expiration_date,
        };
      });

      return response;
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppError(error.message, error.statusCode);
      }
      // @ts-ignore
      throw new AppError(error.response.data, 400);
    }
  }
}
export default Pagarme;
