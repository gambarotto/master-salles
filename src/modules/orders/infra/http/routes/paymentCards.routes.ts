import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import PaymentCardsController from '../controllers/PaymentCardsController';

const paymentCardRoutes = Router();
const paymentCardsController = new PaymentCardsController();

paymentCardRoutes.get('/', ensureAuthenticated, paymentCardsController.index);

export default paymentCardRoutes;
