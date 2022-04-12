import { Router } from 'express';
import validateToken from '../../middlewares/auth.middleware';
import validateId from '../../middlewares/validateId.middleware';
import * as controller from '../../controllers/product.controller';

const products = Router();

products.route('/').get(controller.index).post(controller.create);

products
  .route('/:id')
  .get(validateId, controller.getOne)
  .put(validateToken, validateId, controller.update)
  .delete(validateToken, validateId, controller.deleteProduct);

export default products;
