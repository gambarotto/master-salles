import IUserAdressesRepository from '@modules/users/repositories/IUserAdressesRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import IGatewayProvider from '@shared/container/providers/GatewayProvider/models/IGatewayProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

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
  amount: string;
  delivery_fee: number;
  card_hash?: string;
  card_id?: string;
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
  ) {}

  async execute({
    amount,
    delivery_fee,
    card_hash,
    card_id,
    user_id,
    shipping_address_id,
    billing_address_id,
    itemsRequest,
  }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById({ user_id });
    if (!user) {
      throw new AppError('Invalid user');
    }
    const billingAddress = await this.userAdressesRepository.findById(
      shipping_address_id,
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
        billing_address_id,
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

    const credit_card = {
      card_number: '4111111111111111',
      card_cvv: '754',
      card_expiration_date: '1122',
      card_holder_name: 'Morpheus Fishburne',
    };
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
        unit_price: item.product.sale_price,
        quantity: item.quantity,
        tangible: true,
      };
    });

    const transaction = await this.gatewayProvider.createTransaction({
      amount,
      credit_card,
      customer,
      billing,
      shipping,
      items,
    });
    console.log(transaction);
  }
}

export default CreateOrdersService;
