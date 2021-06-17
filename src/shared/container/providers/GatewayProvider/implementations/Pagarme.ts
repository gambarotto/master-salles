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

  public async create({
    amount,
    credit_card,
    customer,
    billing,
    shipping,
    items,
  }: ICreateTransationCCDTO): Promise<IResponseTransactionDTO> {
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
    console.log(response);
    if (!response.data) throw new AppError('Error on gateway');

    const {
      status,
      refuse_reason,
      status_reason,
      authorization_code,
      tid,
      payment_method,
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
