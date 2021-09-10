import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';

const ordersRoutes = Router();
const ordersController = new OrdersController();

const validationRequestCreate = celebrate({
  [Segments.BODY]: {
    amount: Joi.number().positive().required(),
    card_hash: Joi.string().allow(''),
    card_id: Joi.string().allow(''),
    delivery_fee: Joi.number().required(),
    delivery: Joi.boolean().required(),
    billing_address_id: Joi.string().uuid().required(),
    shipping_address_id: Joi.string().uuid().required(),
    items: Joi.array()
      .items({
        product: Joi.object({
          id: Joi.string().uuid().required(),
          name: Joi.string().required(),
          description: Joi.string().required(),
          sale_price: Joi.number().positive(),
        }),
        quantity: Joi.number().integer().positive().required(),
      })
      .min(1),
  },
});

ordersRoutes.post(
  '/',
  ensureAuthenticated,
  validationRequestCreate,
  ordersController.create,
);
ordersRoutes.get('/', ensureAuthenticated, ordersController.index);
ordersRoutes.get('/:order_id', ensureAuthenticated, ordersController.show);

export default ordersRoutes;
