import { container } from 'tsyringe';
import Pagarme from './implementations/Pagarme';
import IGatewayProvider from './models/IGatewayProvider';

const providers = {
  pagarme: Pagarme,
};

container.registerSingleton<IGatewayProvider>(
  'GatewayProvider',
  providers.pagarme,
);
