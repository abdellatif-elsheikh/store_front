import { Router } from 'express';
import * as controller from '../../controllers/user.controller';
import validateToken from '../../middlewares/auth.middleware';
import validateId from '../../middlewares/validateId.middleware';

const users = Router();

users.route('/').get(validateToken, controller.index).post(controller.create);
users
  .route('/:id')
  .get(validateToken, validateId, controller.getOne)
  .put(validateToken, validateId, controller.update)
  .delete(validateToken, validateId, controller.deleteUser);

users.route('/auth').post(controller.authenticate);

export default users;
