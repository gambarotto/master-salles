import { container } from 'tsyringe';
import Pagarme from './implementations/Pagarme';
import IGatewayProvider from './models/IGatewayProvider';

const providers = {
  pagarme: container.resolve(Pagarme),
};

container.registerInstance<IGatewayProvider>(
  'GatewayProvider',
  providers.pagarme,
);
