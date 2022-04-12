import { Router } from 'express';
import * as controller from '../../controllers/orderProduct.controller';
import validateToken from '../../middlewares/auth.middleware';
import validateId from '../../middlewares/validateId.middleware';

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
  .put(validateToken, validateId, controller.update)
  .delete(validateId, validateToken, controller.deleteOne);

export default orderProduct;
