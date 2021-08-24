import Transaction from '@modules/orders/infra/typeorm/entities/Transaction';
import IResponseTransactionDTO from '@shared/container/providers/GatewayProvider/dtos/IResponseTransaction';
import { v4 } from 'uuid';
import ITransactionRepository from '../ITransactionRepository';

class FakeTransactionRepository implements ITransactionRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  async create(data: IResponseTransactionDTO): Promise<Transaction> {
    const transactionCreated = new Transaction();
    Object.assign(transactionCreated, { id: v4(), data });
    this.transactions.push(transactionCreated);
    return transactionCreated;
  }
}

export default FakeTransactionRepository;
