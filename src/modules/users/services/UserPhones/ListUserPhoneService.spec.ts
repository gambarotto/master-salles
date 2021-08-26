import User from '@modules/users/infra/typeorm/entities/User';
import FakeUserPhoneRepository from '@modules/users/repositories/fakes/FakeUserPhoneRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListUserPhoneService from './ListUserPhoneService';

let fakeUserPhoneRepository: FakeUserPhoneRepository;
let fakeUsersRepository: FakeUsersRepository;
let listUserPhoneService: ListUserPhoneService;

let user: User;
describe('List user phones', () => {
  beforeEach(async () => {
    fakeUserPhoneRepository = new FakeUserPhoneRepository();
    fakeUsersRepository = new FakeUsersRepository();
    listUserPhoneService = new ListUserPhoneService(fakeUserPhoneRepository);

    user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
  });
  it('Should be able list all phone number from an user', async () => {
    await fakeUserPhoneRepository.create({
      user_id: user.id,
      phone_number: '11988885555',
      default: true,
    });
    const userPhones = await listUserPhoneService.execute({ user_id: user.id });
    expect(userPhones).toHaveLength(1);
  });
});
