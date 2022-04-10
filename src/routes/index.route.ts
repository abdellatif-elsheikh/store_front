import { Router } from 'express';
import users from './api/users.route';
import products from './api/products.route';

const routes = Router();

routes.use('/users', users);
routes.use('/products', products);

export default routes;
