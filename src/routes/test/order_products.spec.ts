import supertest from 'supertest';
import db from '../../database';
import app from '../../server';
import User from '../../types/User.type';
import UserModel from '../../models/User.model';
import ProductModel from '../../models/Product.model';
import OrderModel from '../../models/Order.model';
import Product from '../../types/Product.type';

const userModel = new UserModel();
const orderModel = new OrderModel();
const productModel = new ProductModel();
const request = supertest(app);

let token = '';
let orderId = '';
let order_product_id = '';

describe('test order product model', () => {
  const user = {
    user_name: 'teest',
    email: 'teest@email.com',
    first_name: 'first',
    last_name: 'last',
    password: 'test',
    gender: 'male',
  } as User;
  const product = {
    name: 'test',
    price: 100,
    category: 'test',
  } as Product;
  beforeAll(async () => {
    const createUser = await userModel.create(user);
    user.id = createUser.id;
  });
  beforeAll(async () => {
    const createOrder = await orderModel.create({
      user_id: user.id as string,
      status: 'active',
    });
    orderId = createOrder.id as string;
  });
  beforeAll(async () => {
    const createProduct = await productModel.create(product);
    product.id = createProduct.id;
  });
  afterAll(async () => {
    const conn = await db.connect();
    const sql =
      ' DELETE FROM users;\n DELETE FROM orders;\n DELETE FROM products;\n DELETE FROM order_products;';
    await conn.query(sql);
    conn.release();
  });

  describe('test auth', () => {
    it('should be able to authenticate user', async () => {
      const res = await request.post('/api/users/auth').send({
        email: user.email,
        password: user.password,
      });
      expect(res.status).toBe(200);
      expect(res.body.data.token).toBeDefined();
      token = res.body.data.token;
    });
  });

  describe('test order_products CRUD', () => {
    it('should be able to create new order_products', async () => {
      const res = await request
        .post('/api/order_products/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          order_id: orderId,
          product_id: product.id,
          quantity: 2,
        });

      const { id, order_id, product_id, quantity } = res.body.data;
      order_product_id = id;
      expect(res.status).toBe(201);
      expect(order_id).toBe(orderId);
      expect(product_id).toBe(product.id);
      expect(quantity).toBe(2);
    });

    it('should be able to get all order_products', async () => {
      const res = await request
        .get('/api/order_products/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data[0].order_id).toBe(orderId);
    });

    it('should be able to get order_products by order_id and product id', async () => {
      const res = await request
        .get(`/api/order_products/${orderId}/products/${product.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.user).toBe(user.user_name);
      expect(res.body.data.order_id).toBe(orderId);
      expect(res.body.data.product_id).toBe(product.id);
      expect(res.body.data.quantity).toBe(2);
      expect(res.body.data.category).toBe(product.category);
    });

    it('should be able to update order_products', async () => {
      const res = await request
        .put(`/api/order_products/${order_product_id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          order_id: orderId,
          product_id: product.id,
          quantity: 3,
        });
      expect(res.status).toBe(200);
      expect(res.body.data.quantity).toBe(3);
    });

    it('should be able to delete order_products', async () => {
      const res = await request
        .delete(`/api/order_products/${order_product_id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.deleted.message).toBe('order_product deleted');
    });
  });
});
