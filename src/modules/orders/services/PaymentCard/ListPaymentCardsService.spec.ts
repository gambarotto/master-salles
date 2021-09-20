import FakePaymentCardRepository from '@modules/orders/repositories/fakes/FakePaymentCardRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeGatewayProvider from '@shared/container/providers/GatewayProvider/fakes/FakeGatewayProvider';
import AppError from '@shared/errors/AppError';
import ListPaymentCardsService from './ListPaymentCardsService';

let listPaymentCardsService: ListPaymentCardsService;
let fakeUsersRepository: FakeUsersRepository;
let fakePaymentCardRepository: FakePaymentCardRepository;
let fakeGatewayProvider: FakeGatewayProvider;

let user: User;
describe('List Payment Cards', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakePaymentCardRepository = new FakePaymentCardRepository();
    fakeGatewayProvider = new FakeGatewayProvider();
    listPaymentCardsService = new ListPaymentCardsService(
      fakeUsersRepository,
      fakePaymentCardRepository,
      fakeGatewayProvider,
    );
    user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
  });
  it('Should be able list all payments cards from user', async () => {
    const cards = await listPaymentCardsService.execute(user.id);
    expect(cards).toHaveLength(0);
  });
  it('Should not be able list all payments cards from user', async () => {
    await expect(
      listPaymentCardsService.execute('invalid-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
