import User from '@modules/users/infra/typeorm/entities/User';
import UserAddress from '@modules/users/infra/typeorm/entities/UserAddress';
import FakeUserAdressesRepository from '@modules/users/repositories/fakes/FakeUserAdressesRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeGatewayProvider from '@shared/container/providers/GatewayProvider/fakes/FakeGatewayProvider';
import AppError from '@shared/errors/AppError';
import FakeStatusRepository from '../repositories/fakes/FakeStatusRepository';
import FakeOrdersTransactions from '../transactions/fakes/FakeOrdersTransactions';
import CreateOrderService from './CreateOrderService';

let fakeGatewayProvider: FakeGatewayProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserAdressesRepository: FakeUserAdressesRepository;
let fakeStatusRepository: FakeStatusRepository;
let fakeOrdersTransactions: FakeOrdersTransactions;
let createOrderService: CreateOrderService;

let user: User;
let address: UserAddress;

describe('Orders create', () => {
  beforeEach(async () => {
    fakeGatewayProvider = new FakeGatewayProvider();
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserAdressesRepository = new FakeUserAdressesRepository();
    fakeStatusRepository = new FakeStatusRepository();
    fakeOrdersTransactions = new FakeOrdersTransactions();
    createOrderService = new CreateOrderService(
      fakeGatewayProvider,
      fakeUsersRepository,
      fakeUserAdressesRepository,
      fakeStatusRepository,
      fakeOrdersTransactions,
    );

    user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
    address = await fakeUserAdressesRepository.create({
      user_id: user.id,
      street: 'rua um',
      number: '34',
      district: 'bairro1',
      city: 'cidade1',
      zip_code: '13132132',
      complement: 'condominio',
      reference_point: 'perto de',
      alias: 'casa',
      default: true,
    });
    await fakeStatusRepository.create({
      name: 'Concluído',
      description: 'gjkilpç9875tjjkl6t5ed3qw12',
    });
  });

  it('Should be able create a new order', async () => {
    const order = await createOrderService.execute({
      amount: 120.54,
      delivery_fee: 10,
      delivery: true,
      card_hash: '',
      card_id: '',
      card: {
        card_number: '4111111111111111',
        card_cvv: '553',
        card_expiration_date: '0423',
        card_holder_name: 'Diego Carvalho',
      },
      user_id: user.id,
      shipping_address_id: address.id,
      billing_address_id: address.id,
      itemsRequest: [
        {
          product: {
            id: 'd2943219-d686-4f67-8547-8fe279f2512e',
            name: 'Queijo Frescal',
            description: 'bnnjkmlj',
            sale_price: 29.7,
          },
          quantity: 4,
        },
      ],
    });
    expect(order).toHaveProperty('id');
  });
  it('Should be able create a new order if shipping address id is different of billing address id', async () => {
    const userAddress = await fakeUserAdressesRepository.create({
      user_id: user.id,
      street: 'rua dois',
      number: '345',
      district: 'bairro2',
      city: 'cidade2',
      zip_code: '13132132',
      complement: 'condominio',
      reference_point: 'perto de',
      alias: 'trabalhar',
      default: false,
    });
    const order = await createOrderService.execute({
      amount: 120.54,
      delivery_fee: 10,
      delivery: true,
      card_hash: '',
      card_id: '',
      card: {
        card_number: '4111111111111111',
        card_cvv: '553',
        card_expiration_date: '0423',
        card_holder_name: 'Diego Carvalho',
      },
      user_id: user.id,
      shipping_address_id: userAddress.id,
      billing_address_id: address.id,
      itemsRequest: [
        {
          product: {
            id: 'd2943219-d686-4f67-8547-8fe279f2512e',
            name: 'Queijo Frescal',
            description: 'bnnjkmlj',
            sale_price: 29.7,
          },
          quantity: 4,
        },
      ],
    });
    expect(order).toHaveProperty('id');
  });
  it('Should not be able create a new order if user id is invalid', async () => {
    await expect(
      createOrderService.execute({
        amount: 120.54,
        delivery_fee: 10,
        delivery: true,
        card_hash: '',
        card_id: '',
        card: {
          card_number: '4111111111111111',
          card_cvv: '553',
          card_expiration_date: '0423',
          card_holder_name: 'Diego Carvalho',
        },
        user_id: 'invalid-id',
        shipping_address_id: address.id,
        billing_address_id: address.id,
        itemsRequest: [
          {
            product: {
              id: 'd2943219-d686-4f67-8547-8fe279f2512e',
              name: 'Queijo Frescal',
              description: 'bnnjkmlj',
              sale_price: 29.7,
            },
            quantity: 4,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able create a new order if shipping address id is invalid', async () => {
    await expect(
      createOrderService.execute({
        amount: 120.54,
        delivery_fee: 10,
        delivery: true,
        card_hash: '',
        card_id: '',
        card: {
          card_number: '4111111111111111',
          card_cvv: '553',
          card_expiration_date: '0423',
          card_holder_name: 'Diego Carvalho',
        },
        user_id: user.id,
        shipping_address_id: 'invalid-id',
        billing_address_id: address.id,
        itemsRequest: [
          {
            product: {
              id: 'd2943219-d686-4f67-8547-8fe279f2512e',
              name: 'Queijo Frescal',
              description: 'bnnjkmlj',
              sale_price: 29.7,
            },
            quantity: 4,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able create a new order if billing address id is invalid', async () => {
    await expect(
      createOrderService.execute({
        amount: 120.54,
        delivery_fee: 10,
        delivery: true,
        card_hash: '',
        card_id: '',
        card: {
          card_number: '4111111111111111',
          card_cvv: '553',
          card_expiration_date: '0423',
          card_holder_name: 'Diego Carvalho',
        },
        user_id: user.id,
        shipping_address_id: address.id,
        billing_address_id: 'invalid-id',
        itemsRequest: [
          {
            product: {
              id: 'd2943219-d686-4f67-8547-8fe279f2512e',
              name: 'Queijo Frescal',
              description: 'bnnjkmlj',
              sale_price: 29.7,
            },
            quantity: 4,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able create a new order if status is invalid', async () => {
    const st = await fakeStatusRepository.findByName('Concluído');

    if (st) {
      await fakeStatusRepository.delete(st.id);
    }
    await expect(
      createOrderService.execute({
        amount: 120.54,
        delivery_fee: 10,
        delivery: true,
        card_hash: '',
        card_id: '',
        card: {
          card_number: '4111111111111111',
          card_cvv: '553',
          card_expiration_date: '0423',
          card_holder_name: 'Diego Carvalho',
        },
        user_id: user.id,
        shipping_address_id: address.id,
        billing_address_id: address.id,
        itemsRequest: [
          {
            product: {
              id: 'd2943219-d686-4f67-8547-8fe279f2512e',
              name: 'Queijo Frescal',
              description: 'bnnjkmlj',
              sale_price: 29.7,
            },
            quantity: 4,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
