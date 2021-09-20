import { container } from 'tsyringe';
import CryptoJsProvider from './implementations/CryptoJsProvider';
import IEncryptProvider from './models/IEncryptProvider';

const providers = {
  cryptoJs: CryptoJsProvider,
};
container.registerSingleton<IEncryptProvider>(
  'EncryptProvider',
  providers.cryptoJs,
);
