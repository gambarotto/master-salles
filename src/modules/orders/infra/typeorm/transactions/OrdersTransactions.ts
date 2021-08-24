import ICreateSaleDTO from '@modules/orders/dtos/ICreateSaleDTO';
import IOrdersTransactions from '@modules/orders/transactions/IOrdersTransactions';
import AppError from '@shared/errors/AppError';
import { getManager } from 'typeorm';
import Order from '../entities/Order';
import PaymentCard from '../entities/PaymentCard';
import Transaction from '../entities/Transaction';

class OrdersTransactions implements IOrdersTransactions {
  async createSale({
    user_id,
    orderData,
    cardId,
    transactionData,
  }: ICreateSaleDTO): Promise<Order | undefined> {
    try {
      let order = {} as Order;

      await getManager().transaction(async transactionalEntityManager => {
        const transaction = new Transaction();
        Object.assign(
          transaction,
          { ...transactionData },
          {
            card_id: transactionData.card.id,
          },
        );
        const transactionDB = await transactionalEntityManager.save(
          Transaction,
          transaction,
        );
        if (!cardId) {
          await transactionalEntityManager.save(PaymentCard, {
            user_id,
            card_id: transactionData.card.id,
          });
        }
        Object.assign(orderData, { transaction_id: transactionDB.id });

        order = await transactionalEntityManager.save(Order, orderData);
      });
      return order;
    } catch (error) {
      throw new AppError('Error on create sale');
    }
  }
}
export default OrdersTransactions;
