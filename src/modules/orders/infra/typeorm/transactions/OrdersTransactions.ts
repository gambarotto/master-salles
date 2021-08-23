import ICreateSaleDTO from '@modules/orders/dtos/ICreateSaleDTO';
import IOrdersTransactions from '@modules/orders/transactions/IOrdersTransactions';
import { getManager, getRepository, Repository } from 'typeorm';
import Order from '../entities/Order';
import PaymentCard from '../entities/PaymentCard';
import Transaction from '../entities/Transaction';

class OrdersTransactions implements IOrdersTransactions {
  private transactionRepo: Repository<Transaction>;

  constructor() {
    this.transactionRepo = getRepository(Transaction);
  }

  async createSale({
    user_id,
    cardId,
    transactionData,
    orderData,
  }: ICreateSaleDTO): Promise<void> {
    try {
      await getManager().transaction(async transactionalEntityManager => {
        Object.assign(transactionData, { card_id: transactionData.card.id });
        const transactionCreated = this.transactionRepo.create(transactionData);
        const transactionDB = await transactionalEntityManager.save(
          Transaction,
          transactionCreated,
        );
        if (!cardId) {
          await transactionalEntityManager.save(PaymentCard, {
            user_id,
            card_id: transactionData.card.id,
          });
        }
        Object.assign(orderData, { transaction_id: transactionDB.id });
        await transactionalEntityManager.save(Order, orderData);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
export default OrdersTransactions;
