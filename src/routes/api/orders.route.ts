import { Router } from 'express';
import validateToken from '../../middlewares/auth.middleware';
import validateId from '../../middlewares/validateId.middleware';
import * as controller from '../../controllers/order.controller';

const orders = Router();

orders
  .route('/')
  .get(validateToken, controller.index)
  .post(validateToken, controller.create);

orders
  .route('/:id')
  .get(validateToken, validateId, controller.getOne)
  .put(validateToken, validateId, controller.update)
  .delete(validateToken, validateId, controller.deleteOne);

orders.route('/users/:id').get(validateToken, controller.getOrdersByUserId);

export default orders;