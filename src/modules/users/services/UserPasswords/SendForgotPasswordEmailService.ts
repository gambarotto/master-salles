import path from 'path';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User not found');
    }
    const alreadyCode = await this.userTokensRepository.findByUser(user.id);
    if (alreadyCode) {
      await this.userTokensRepository.delete(alreadyCode.id);
    }
    const { verification_code } = await this.userTokensRepository.generate(
      user.id,
    );
    const forgotPasswordtemplateEmail = path.resolve(
      __dirname,
      '..',
      'templates',
      'forgot_password.hbs',
    );
    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Master Sales] Recuperação de senha',
      templateData: {
        file: forgotPasswordtemplateEmail,
        variables: {
          name: user.name,
          verification_code,
        },
      },
    });
  }
}
export default SendForgotPasswordEmailService;
