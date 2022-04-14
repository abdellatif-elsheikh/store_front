import { Router } from 'express';
import * as controller from '../../controllers/orderProduct.controller';
import validateToken from '../../middlewares/auth.middleware';

const orderProduct = Router();

orderProduct
  .route('/')
  .get(validateToken, controller.index)
  .post(validateToken, controller.create);

orderProduct.get(
  '/:order_id/products/:product_id',
  validateToken,
  controller.getOne
);
orderProduct
  .route('/:id')
  .put(validateToken, controller.update)
  .delete(validateToken, controller.deleteOne);

export default orderProduct;
