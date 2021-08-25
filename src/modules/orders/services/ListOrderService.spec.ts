import User from '@modules/users/infra/typeorm/entities/User';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import Status from '../infra/typeorm/entities/Status';
import FakeOrderRepository from '../repositories/fakes/FakeOrderRepository';
import FakeStatusRepository from '../repositories/fakes/FakeStatusRepository';
import ListOrderService from './ListOrderService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStatusRepository: FakeStatusRepository;
let fakeOrderRepository: FakeOrderRepository;
let listOrderService: ListOrderService;

let user: User;
let status: Status;

describe('Orders List', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStatusRepository = new FakeStatusRepository();
    fakeOrderRepository = new FakeOrderRepository();
    listOrderService = new ListOrderService(
      fakeUsersRepository,
      fakeOrderRepository,
    );
    user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
    status = await fakeStatusRepository.create({
      name: 'Concluído',
      description: 'gjkilpç9875tjjkl6t5ed3qw12',
    });
  });

  it('Should be able list all orders from user', async () => {
    await fakeOrderRepository.create({
      amount: 120.54,
      delivery_fee: 10,
      delivery: true,
      user_id: user.id,
      status: [status],
      shipping_address_id: 'id-address',
      billing_address_id: 'id-address',
      order_product: [
        {
          id: 'd2943219-d686-4f67-8547-8fe279f2512e',
          title: 'produto 1',
          quantity: 4,
          unit_price: 29.7,
          tangible: true,
        },
      ],
      transaction_id: '55779900',
    });

    const orders = await listOrderService.execute({
      user_id: user.id,
    });
    expect(orders).toHaveLength(1);
  });
  it('Should be list an array with lengh 0', async () => {
    const orders = await listOrderService.execute({
      user_id: user.id,
    });
    expect(orders).toHaveLength(0);
  });
  it('Should not be able list orders if user id is invalid', async () => {
    await expect(
      listOrderService.execute({
        user_id: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
