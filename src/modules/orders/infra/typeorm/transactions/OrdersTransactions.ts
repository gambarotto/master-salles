import ICreateSaleDTO from '@modules/orders/dtos/ICreateSaleDTO';
import IOrdersTransactions from '@modules/orders/transactions/IOrdersTransactions';
import AppError from '@shared/errors/AppError';
import { getManager } from 'typeorm';
import Order from '../entities/Order';
import OrderProduct from '../entities/OrderProduct';
import PaymentCard from '../entities/PaymentCard';
import Transaction from '../entities/Transaction';

/**
 * ------ TRANSACTION DB ----------------------------------
 * criar um registro transaction no bd
 * criar um registro card no bd se for a primeira compra
 * criar um registro order no bd
 * criar os registros dos produtos no db
 * ------ FIM TRANSACTION DB ------------------------------
 * retornar order
 */

class OrdersTransactions implements IOrdersTransactions {
  async createSale({
    user_id,
    orderData,
    cardId,
    transactionData,
  }: ICreateSaleDTO): Promise<Order> {
    try {
      let order = {} as Order;

      // Start transaction
      await getManager().transaction(async transactionalEntityManager => {
        // Save transaction Response on DB

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
        // If not saved on DB, when save cardId
        if (!cardId) {
          await transactionalEntityManager.save(PaymentCard, {
            user_id,
            card_id: transactionData.card.id,
          });
        }

        Object.assign(orderData, {
          transaction_id: transactionDB.id,
        });

        // Save order on DB
        order = await transactionalEntityManager.save(Order, orderData);

        // Save order products on DB
        const orderProducts = orderData.order_product.map(item => {
          const orderProductObject = new OrderProduct();
          Object.assign(orderProductObject, {
            order_id: order.id,
            product_id: item.id,
            quantity: item.quantity,
            price: item.unit_price,
          });
          return transactionalEntityManager.save(
            OrderProduct,
            orderProductObject,
          );
        });

        await Promise.all(orderProducts);
      });
      return order;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      throw new AppError('Error on create sale');
    }
  }
}
export default OrdersTransactions;
