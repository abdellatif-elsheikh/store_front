import { Router } from 'express';
import users from './api/users.route';
import products from './api/products.route';
import orders from './api/orders.route';
import orderProduct from './api/orderProduct.route';

const routes = Router();

routes.use('/users', users);
routes.use('/products', products);
routes.use('/orders', orders);
routes.use('/order_products', orderProduct);

export default routes;
