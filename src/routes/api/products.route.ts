import { Router } from 'express';
import validateToken from '../../middlewares/auth.middleware';
import validateId from '../../middlewares/validateId.middleware';
import * as controller from '../../controllers/product.controller';

const products = Router();

products
  .route('/')
  .get(validateToken, controller.index)
  .post(controller.create);

export default products;
