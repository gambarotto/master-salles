import User from '@modules/users/infra/typeorm/entities/User';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import VerifyCodeResetPasswordService from './VerifyCodeResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokensRepository;
let verifyCodeResetPassword: VerifyCodeResetPasswordService;

let user: User;

describe('Verify reset code password', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokenRepository = new FakeUserTokensRepository();
    verifyCodeResetPassword = new VerifyCodeResetPasswordService(
      fakeUsersRepository,
      fakeUserTokenRepository,
    );

    user = await fakeUsersRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
    });
  });
  it('Should be correct the verification', async () => {
    const { verification_code } = await fakeUserTokenRepository.generate(
      user.id,
    );
    await expect(verifyCodeResetPassword.execute({ verification_code }))
      .resolves;
  });
});
