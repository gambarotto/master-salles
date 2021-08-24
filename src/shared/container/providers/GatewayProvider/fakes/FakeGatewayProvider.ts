import AppError from '@shared/errors/AppError';
import ICreateTransationCCDTO from '../dtos/ICreateTransationCCDTO';
import IResponseTransactionDTO from '../dtos/IResponseTransaction';
import IGatewayProvider from '../models/IGatewayProvider';

class FakeGatewayProvider implements IGatewayProvider {
  async createTransaction(
    data: ICreateTransationCCDTO,
  ): Promise<IResponseTransactionDTO | undefined> {
    if (data.credit_card && data.credit_card.card_number.length !== 16) {
      throw new AppError('Invalid card');
    }

    const response = {
      acquirer_id: 'jtfjhgfulloççklokj',
      acquirer_name: 'pagarme',
      acquirer_response_code: '0000',
      transaction_amount: data.amount,
      status: 'paid',
      refuse_reason: null,
      status_reason: 'acquirer',
      authorization_code: '76653',
      tid: 13246783,
      payment_method: 'credit_card',
      card: {
        object: 'card',
        id: 'card_jolkyhgfilooççljhuy',
        date_created: '2021-08-20T20:35:45.975Z',
        date_updated: '2021-08-20T20:35:46.356Z',
        brand: 'visa',
        holder_name: 'Morpheus Fishburne',
        first_digits: '411111',
        last_digits: '1111',
        country: 'UNITED STATES',
        fingerprint: 'cj5bw4cio00000j23jx5l60cq',
        valid: true,
        expiration_date: '0922',
      },
    };

    return response;
  }
}

export default FakeGatewayProvider;
