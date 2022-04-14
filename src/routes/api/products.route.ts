import { Router } from 'express';
import validateToken from '../../middlewares/auth.middleware';
import * as controller from '../../controllers/product.controller';

const products = Router();

products
  .route('/')
  .get(controller.index)
  .post(validateToken, controller.create);

products
  .route('/:id')
  .get(controller.getOne)
  .put(validateToken, controller.update)
  .delete(validateToken, controller.deleteProduct);

export default products;
