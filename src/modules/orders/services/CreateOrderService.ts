import IUserAdressesRepository from '@modules/users/repositories/IUserAdressesRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import IGatewayProvider from '@shared/container/providers/GatewayProvider/models/IGatewayProvider';
import AppError from '@shared/errors/AppError';
import createCardHashPagarme from '@shared/helpers/createCardHashPagarme';
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
  user_id: string;
  shipping_address_id: string;
  billing_address_id: string;
  itemsRequest: [IItem];
}

@injectable()
class CreateOrderService {
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

    // Decoding cardHash
    let card_hash_pagarme;
    if (card_hash) {
      card_hash_pagarme = await createCardHashPagarme(card_hash, user.id);
    }

    // criando transaction no pagarme
    const transaction = await this.gatewayProvider.createTransaction({
      amount: formatValue(amount),
      card_hash: card_hash_pagarme || '',
      card_id,
      customer,
      billing,
      shipping,
      items,
    });

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
      order_product: items.map((item, index) => {
        return { ...item, unit_price: itemsRequest[index].product.sale_price };
      }),
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

export default CreateOrderService;
