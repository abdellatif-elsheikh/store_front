import supertest from 'supertest';
import db from '../../database';
import app from '../../server';
import User from '../../types/User.type';
import UserModel from '../../models/User.model';

const userModel = new UserModel();
const request = supertest(app);
let token = '';
let orderId = '';

describe('order api endpoints', () => {
  const user = {
    user_name: 'order',
    email: 'order@email.com',
    first_name: 'first',
    last_name: 'last',
    password: 'test',
    gender: 'male',
  } as User;
  beforeAll(async () => {
    const createUser = await userModel.create(user);
    user.id = createUser.id;
  });
  afterAll(async () => {
    const conn = await db.connect();
    const sql =
      'DELETE FROM orders;\n DELETE FROM users;\n DELETE FROM products;\n DELETE FROM order_products;';
    await conn.query(sql);
    conn.release();
  });

  describe('test auth', () => {
    it('should be able to authenticate user', async () => {
      const res = await request
        .post('/api/users/auth')
        .set('Content-type', 'application/json')
        .send({
          email: user.email,
          password: user.password,
        });
      expect(res.status).toBe(200);
      expect(res.body.data.token).toBeDefined();
      expect(user.id).toEqual(res.body.data.id);
      token = res.body.data.token;
    });
  });

  describe('test CRUD', () => {
    it('should be able to create new order', async () => {
      const res = await request
        .post('/api/orders/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          user_id: user.id,
          status: 'active',
        });

      const { id, user_id, status } = res.body.data;
      orderId = id;
      expect(res.status).toBe(201);
      expect(user_id).toBe(user.id);
      expect(status).toBe('active');
    });

    it('should be able to get all orders', async () => {
      const res = await request
        .get('/api/orders/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      const { user_id, status } = res.body.data[0];
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(user_id).toBe(user.id);
      expect(status).toBe('active');
    });

    it('should be able to get order by id', async () => {
      const res = await request
        .get(`/api/orders/${orderId}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      const { id, user_id, status } = res.body.data;
      expect(res.status).toBe(200);
      expect(id).toBe(orderId);
      expect(user_id).toBe(user.id);
      expect(status).toBe('active');
    });

    it('should be able to update order', async () => {
      const res = await request
        .put(`/api/orders/${orderId}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          user_id: user.id,
          status: 'active',
        });

      expect(res.status).toBe(201);
      expect(res.body.data.status).toBe('active');
    });
  });
  it('should be able to get all orders by user id', async () => {
    const res = await request
      .get(`/api/orders/users/${user.id}`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    const { id, user_id, status, user_name } = res.body.data[0];
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(id).toBe(orderId);
    expect(user_id).toBe(user.id);
    expect(user_name).toBe(user.user_name);
    expect(status).toBe('active');
  });
  it('should be able to delete order', async () => {
    const res = await request
      .delete(`/api/orders/${orderId}`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.deleted.message).toBe('Order deleted successfully');
  });
});
