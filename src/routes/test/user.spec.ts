import UserModel from '../../models/User.model';
import User from '../../types/User.type';
import supertest from 'supertest';
import db from '../../database';
import app from '../../server';

const userModel = new UserModel();
const request = supertest(app);
let token = '';

xdescribe('user api endpoints', () => {
  const user = {
    user_name: 'test',
    email: 'test@email.com',
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
    const sql = 'DELETE FROM users;';
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
      expect(user.id).toEqual(res.body.data.id);
      token = res.body.data.token;
    });
  });

  describe('test CRUD', () => {
    it('should be able to create new user', async () => {
      const res = await request
        .post('/api/users/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          user_name: 'test2',
          email: 'test2@gmail.com',
          first_name: 'first2',
          last_name: 'last2',
          password: 'test2',
          gender: 'female',
        });
      const { email, user_name } = res.body.data;
      expect(res.status).toBe(200);
      expect(email).toBe('test2@gmail.com');
      expect(user_name).toBe('test2');
    });

    it('should be able to get all users', async () => {
      const res = await request
        .get('/api/users/')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should be able to get user by id', async () => {
      const res = await request
        .get(`/api/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`);
      const { id, user_name, email, first_name, last_name } = res.body.data;
      expect(res.status).toBe(200);
      expect(id).toBe(user.id);
      expect(user_name).toBe(user.user_name);
      expect(email).toBe(user.email);
      expect(first_name).toBe(user.first_name);
      expect(last_name).toBe(user.last_name);
    });

    it('should be able to update user', async () => {
      const res = await request
        .put(`/api/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          user_name: 'test3',
          email: 'test3@gmail.com',
          first_name: 'first3',
          last_name: 'last3',
          password: 'test3',
          gender: 'female',
        });

      const { id, user_name, email } = res.body.data;
      expect(res.status).toBe(200);
      expect(id).toBe(user.id);
      expect(user_name).toBe('test3');
      expect(email).toBe('test3@gmail.com');
    });

    it('should be able to delete user', async () => {
      const res = await request
        .delete(`/api/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.deleted.message).toBe('User deleted successfully');
    });
  });
});
