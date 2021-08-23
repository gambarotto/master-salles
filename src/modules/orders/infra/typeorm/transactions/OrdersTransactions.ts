import ICreateSaleDTO from '@modules/orders/dtos/ICreateSaleDTO';
import IOrdersTransactions from '@modules/orders/transactions/IOrdersTransactions';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { getManager } from 'typeorm';
import Order from '../entities/Order';
import PaymentCard from '../entities/PaymentCard';
import Transaction from '../entities/Transaction';
import StatusRepository from '../repositories/StatusRepository';

@injectable()
class OrdersTransactions implements IOrdersTransactions {
  constructor(
    @inject('StatusRepository')
    private statusRepository: StatusRepository,
  ) {}

  async createSale({
    user_id,
    amount,
    delivery,
    delivery_fee,
    billing_address_id,
    shipping_address_id,
    cardId,
    transactionData,
    items,
  }: ICreateSaleDTO): Promise<Order | undefined> {
    try {
      let order = {} as Order;
      const status = await this.statusRepository.findByName('Concluído');
      if (!status) {
        throw new AppError('Invalid Status');
      }

      const orderData = {
        user_id,
        amount,
        status: [status],
        delivery,
        delivery_fee,
        billing_address_id,
        shipping_address_id,
        order_product: items.map(item => item.product.id),
      };

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
