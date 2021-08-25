import User from '@modules/users/infra/typeorm/entities/User';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import Status from '../infra/typeorm/entities/Status';
import FakeOrderRepository from '../repositories/fakes/FakeOrderRepository';
import FakeStatusRepository from '../repositories/fakes/FakeStatusRepository';
import ShowOrderService from './ShowOrderService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStatusRepository: FakeStatusRepository;
let fakeOrderRepository: FakeOrderRepository;
let showOrderService: ShowOrderService;

let user: User;
let status: Status;

describe('Orders Show', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStatusRepository = new FakeStatusRepository();
    fakeOrderRepository = new FakeOrderRepository();
    showOrderService = new ShowOrderService(
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

  it('Should be able show a order', async () => {
    const order = await fakeOrderRepository.create({
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

    const orderRec = await showOrderService.execute({
      user_id: user.id,
      order_id: order.id,
    });
    expect(orderRec).toHaveProperty('id');
  });
  it('Should not be able show a order if order id is different of user id', async () => {
    await expect(
      showOrderService.execute({
        user_id: user.id,
        order_id: 'some-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able show a order if user id is invalid', async () => {
    await expect(
      showOrderService.execute({
        user_id: 'invalid-id',
        order_id: 'some-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
