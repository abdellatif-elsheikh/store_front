import { Router } from 'express';
import validateToken from '../../middlewares/auth.middleware';
import * as controller from '../../controllers/order.controller';

const orders = Router();

orders
  .route('/')
  .get(validateToken, controller.index)
  .post(validateToken, controller.create);

orders
  .route('/:id')
  .get(validateToken, controller.getOne)
  .put(validateToken, controller.update)
  .delete(validateToken, controller.deleteOne);

orders.route('/users/:id').get(validateToken, controller.getOrdersByUserId);

export default orders;
