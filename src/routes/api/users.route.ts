import { Router } from 'express';
import * as controller from '../../controllers/user.controller';

const users = Router();

users.route('/').get(controller.index);

export default users;
