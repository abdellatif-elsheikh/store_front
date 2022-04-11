import { Router } from 'express';
import users from './api/users.route';
import products from './api/products.route';
import orders from './api/orders.route';

const routes = Router();

routes.use('/users', users);
routes.use('/products', products);
routes.use('/orders', orders);

export default routes;
