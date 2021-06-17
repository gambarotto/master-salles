import ICreateTransationCCDTO from '../dtos/ICreateTransationCCDTO';
import IResponseTransactionDTO from '../dtos/IResponseTransaction';

export default interface IGatewayProvider {
  create(data: ICreateTransationCCDTO): Promise<IResponseTransactionDTO>;
}
