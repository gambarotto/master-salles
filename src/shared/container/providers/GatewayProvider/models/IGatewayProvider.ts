import ICreateTransationCCDTO from '../dtos/ICreateTransationCCDTO';
import IResponseTransactionDTO from '../dtos/IResponseTransaction';

export default interface IGatewayProvider {
  createTransaction(
    data: ICreateTransationCCDTO,
  ): Promise<IResponseTransactionDTO | undefined>;
}
