import ICreateSaleDTO from '@modules/orders/dtos/ICreateSaleDTO';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import IOrdersTransactions from '../IOrdersTransactions';

class FakeOrdersTransactions implements IOrdersTransactions {
  async createSale({ user_id }: ICreateSaleDTO): Promise<Order> {
    return {
      id: 'jtfjhgfulloççklokj',
      user_id,
      order_number: 3,
      transaction_id: '667890943354',
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
