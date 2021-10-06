import { Router } from 'express';
import UserAvailableDaysDeliveryController from '../controllers/UserAvailableDaysDeliveryController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userAvailableDaysRoute = Router();
const userAvailableDaysDeliveryController =
  new UserAvailableDaysDeliveryController();

userAvailableDaysRoute.use(ensureAuthenticated);
userAvailableDaysRoute.get(
  '/available-days/:user_address_id',
  userAvailableDaysDeliveryController.index,
);

export default userAvailableDaysRoute;
