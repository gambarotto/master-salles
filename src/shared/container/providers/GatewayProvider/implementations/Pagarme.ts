import AppError from '@shared/errors/AppError';
import axios, { AxiosInstance } from 'axios';
import ICreateTransationCCDTO from '../dtos/ICreateTransationCCDTO';
import IResponseTransactionDTO from '../dtos/IResponseTransaction';
import IGatewayProvider from '../models/IGatewayProvider';

class Pagarme implements IGatewayProvider {
  private gateway: AxiosInstance;

  private api_key: string | undefined;

  constructor() {
    this.gateway = axios.create({
      baseURL: 'https://api.pagar.me/1',
    });
    this.api_key = process.env.API_KEY_PAGARME;
  }

  public async createTransaction({
    amount,
    credit_card,
    customer,
    billing,
    shipping,
    items,
  }: ICreateTransationCCDTO): Promise<IResponseTransactionDTO | undefined> {
    const data = {
      api_key: this.api_key,
      amount,
      ...credit_card,
      customer,
      billing,
      shipping,
      items,
    };
    const response = await this.gateway.post('/transactions', data);
    console.log('--------------------', response.data);
    if (!response.data) throw new AppError('Error on gateway');

    const {
      amount,
      status,
      refuse_reason,
      status_reason,
      authorization_code,
      tid,
      payment_method,
      card_first_digits,
      card_last_digits,
      card_brand,
      data_created,
      data_updated,
    } = response.data;
    return {
      status,
      refuse_reason,
      status_reason,
      authorization_code,
      tid,
      payment_method,
    };
  }
}
export default Pagarme;
