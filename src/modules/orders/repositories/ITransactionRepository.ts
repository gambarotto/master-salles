import IResponseTransactionDTO from '@shared/container/providers/GatewayProvider/dtos/IResponseTransaction';
import Transaction from '../infra/typeorm/entities/Transaction';

export default interface ITransactionRepository {
  create(data: IResponseTransactionDTO): Promise<Transaction>;
}
