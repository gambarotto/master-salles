import IUserAdressesRepository from '@modules/users/repositories/IUserAdressesRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import { ICreditCardPagarme } from '@shared/container/providers/GatewayProvider/dtos/ICreateTransationCCDTO';
import IGatewayProvider from '@shared/container/providers/GatewayProvider/models/IGatewayProvider';
import AppError from '@shared/errors/AppError';
import formatValue from '@shared/helpers/handleValues';
import { inject, injectable } from 'tsyringe';
import Order from '../infra/typeorm/entities/Order';
import IStatusRepository from '../repositories/IStatusRepository';
import IOrdersTransactions from '../transactions/IOrdersTransactions';

interface IItem {
  product: {
    id: string;
    name: string;
    description: string;
    sale_price: number;
  };
  quantity: number;
}
interface IRequest {
  amount: number;
  delivery_fee: number;
  delivery: boolean;
  card_hash?: string;
  card_id?: string;
  card?: ICreditCardPagarme;
  user_id: string;
  shipping_address_id: string;
  billing_address_id: string;
  itemsRequest: [IItem];
}

@injectable()
class CreateOrdersService {
  constructor(
    @inject('GatewayProvider')
    private gatewayProvider: IGatewayProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserAdressesRepository')
    private userAdressesRepository: IUserAdressesRepository,
    @inject('StatusRepository')
    private statusRepository: IStatusRepository,
    @inject('OrdersTransactions')
    private ordersTransactions: IOrdersTransactions,
  ) {}

  async execute({
    amount,
    delivery_fee,
    delivery,
    card_hash,
    card_id,
    card,
    user_id,
    shipping_address_id,
    billing_address_id,
    itemsRequest,
  }: IRequest): Promise<Order | undefined> {
    const user = await this.usersRepository.findById({ user_id });
    if (!user) {
      throw new AppError('Invalid user');
    }
    const billingAddress = await this.userAdressesRepository.findById(
      billing_address_id,
    );
    if (!billingAddress) {
      throw new AppError('Address not found');
    }
    const billing = {
      name: billingAddress.alias,
      address: {
        country: 'br',
        state: 'sp',
        city: billingAddress.city,
        neighborhood: billingAddress.district,
        street: billingAddress.street,
        street_number: billingAddress.number,
        zipcode: billingAddress.zip_code,
      },
    };
    let shipping = { ...billing, fee: delivery_fee };

    if (shipping_address_id !== billing_address_id) {
      const addressDB = await this.userAdressesRepository.findById(
        shipping_address_id,
      );
      if (!addressDB) {
        throw new AppError('Address not found');
      }
      shipping = {
        name: user.id,
        fee: delivery_fee,
        address: {
          country: 'br',
          state: 'sp',
          city: addressDB.city,
          neighborhood: addressDB.district,
          street: addressDB.street,
          street_number: addressDB.number,
          zipcode: addressDB.zip_code,
        },
      };
    }

    const customer = {
      external_id: user.id,
      name: user.name,
      type: 'individual',
      country: 'br',
      email: user.email,
      documents: [
        {
          type: 'cpf',
          number: '12298785058',
        },
      ],
      phone_numbers: ['+5511999998888', '+5511888889999'],
    };

    const items = itemsRequest.map(item => {
      return {
        id: item.product.id,
        title: item.product.name,
        unit_price: formatValue(item.product.sale_price),
        quantity: item.quantity,
        tangible: true,
      };
    });
    // criando transaction no pagarme
    const transaction = await this.gatewayProvider.createTransaction({
      amount: formatValue(amount),
      credit_card: card,
      card_hash,
      card_id,
      customer,
      billing,
      shipping,
      items,
    });

    if (!transaction) {
      throw new AppError('Transaction error');
    }

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
      order_product: itemsRequest.map(item => item.product.id),
    };

    const order = await this.ordersTransactions.createSale({
      user_id,
      orderData,
      cardId: card_id,
      transactionData: transaction,
    });

    return order;
  }
}

export default CreateOrdersService;

/**
 * criar uma transação com gateway
 * ------ TRANSACTION DB ----------------------------------
 * criar um registro transaction no bd
 * criar um registro card no bd se for a primeira compra
 * criar um registro order no bd
 * ------ FIM TRANSACTION DB ------------------------------
 * retornar order
 */