import ICreateSaleDTO from '@modules/orders/dtos/ICreateSaleDTO';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import OrderProduct from '@modules/orders/infra/typeorm/entities/OrderProduct';
import PaymentCard from '@modules/orders/infra/typeorm/entities/PaymentCard';
import Transaction from '@modules/orders/infra/typeorm/entities/Transaction';
import IOrdersTransactions from '../IOrdersTransactions';

class FakeOrdersTransactions implements IOrdersTransactions {
  private transactions: Transaction[];

  private paymentCards: PaymentCard[];

  private orders: Order[];

  private orderProducts: OrderProduct[];

  constructor() {
    this.transactions = [];
    this.paymentCards = [];
    this.orders = [];
    this.orderProducts = [];
  }

  async createSale({ user_id }: ICreateSaleDTO): Promise<Order> {
    // const transaction = new Transaction();
    // Object.assign(
    //   transaction,
    //   { ...transactionData },
    //   {
    //     card_id: transactionData.card.id,
    //   },
    // );
    // this.transactions.push(transaction);

    // if (!cardId) {
    //   const card = new PaymentCard();
    //   Object.assign(card, {
    //     id: v4(),
    //     user_id,
    //     card_id: transactionData.card.id,
    //   });
    //   this.paymentCards.push(card);
    // }
    return {
      id: 'jtfjhgfulloççklokj',
      user_id,
      transaction_id: 667890943354,
      amount: 290.54,
      status: [],
      delivery: true,
      delivery_fee: 10,
      billing_address_id: 'jtfjhgfulloççklokj7ht',
      shipping_address_id: 'weujkjgi87643t5y87ki9o',
      order_product: [],
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}

export default FakeOrdersTransactions;
