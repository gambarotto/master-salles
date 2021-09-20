import path from 'path';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

@injectable()
class SendForgotPasswordMail {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User not found');
    }
    const { token } = await this.userTokensRepository.generate(user.id);
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
      subject: '[Master Sale] Recuperação de senha',
      templateData: {
        file: forgotPasswordtemplateEmail,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}
export default SendForgotPasswordMail;
