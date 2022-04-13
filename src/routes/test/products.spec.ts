import supertest from 'supertest';
import db from '../../database';
import app from '../../server';
import User from '../../types/User.type';
import UserModel from '../../models/User.model';

const userModel = new UserModel();
const request = supertest(app);
let token = '';
let productId = '';

describe('test products endpoints', () => {
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
    const sql = 'DELETE FROM orders;\n DELETE FROM users;';
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
      token = res.body.data.token;
    });
  });

  describe('test CRUD', () => {
    it('should be able to create new product', async () => {
      const res = await request
        .post('/api/products/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'test',
          price: 100,
          category: 'test',
        });

      const { id, name, price, category } = res.body.data;
      productId = id;
      expect(res.status).toBe(200);
      expect(name).toEqual('test');
      expect(price).toEqual('100.00' as unknown as number);
      expect(category).toEqual('test');
    });
    it('should be able to get all products', async () => {
      const res = await request
        .get('/api/products/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data[0].name).toBe('test');
    });

    it('should be able to get a product', async () => {
      const res = await request
        .get(`/api/products/${productId}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe('test');
      expect(res.body.data.price).toBe('100.00' as unknown as number);
      expect(res.body.data.category).toBe('test');
    });

    it('should be able to update a product', async () => {
      const res = await request
        .put(`/api/products/${productId}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'test2',
          price: 200,
          category: 'test2',
        });

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe('test2');
      expect(res.body.data.price).toBe('200.00' as unknown as number);
      expect(res.body.data.category).toBe('test2');
    });

    it('should be able to delete a product', async () => {
      const res = await request
        .delete(`/api/products/${productId}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.deleted.message).toBe('Product deleted successfully');
    });
  });
});
