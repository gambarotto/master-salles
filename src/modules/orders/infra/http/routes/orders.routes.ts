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
    card_id: Joi.string()
      .regex(/^card_([a-zA-Z]+([0-9]+[a-zA-Z]+)+)$/)
      .allow(''),
    card: Joi.object()
      .keys({
        card_number: Joi.string().length(16).required(),
        card_cvv: Joi.string().length(3).required(),
        card_expiration_date: Joi.string().length(4).required(),
        card_holder_name: Joi.string(),
      })
      .unknown(),
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
