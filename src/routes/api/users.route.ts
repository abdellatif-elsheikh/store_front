import { Router } from 'express';
import * as controller from '../../controllers/user.controller';
import validateToken from '../../middlewares/auth.middleware';

const users = Router();

users.route('/').get(validateToken, controller.index).post(controller.create);

export default users;
