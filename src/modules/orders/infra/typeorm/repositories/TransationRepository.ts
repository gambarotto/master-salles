import ITransactionRepository from '@modules/orders/repositories/ITransactionRepository';
import IResponseTransactionDTO from '@shared/container/providers/GatewayProvider/dtos/IResponseTransaction';
import { getRepository, Repository } from 'typeorm';
import Transaction from '../entities/Transaction';

class TransactionRepository implements ITransactionRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  async create(data: IResponseTransactionDTO): Promise<Transaction> {
    const transactionCreated = this.ormRepository.create(data);
    const transactionDB = await this.ormRepository.save(transactionCreated);
    return transactionDB;
  }
}

export default TransactionRepository;
