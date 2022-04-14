import UserModel from '../User.model';
import db from '../../database';
import User from '../../types/User.type';
import Error from '../../interfaces/error.interface';

const userModel = new UserModel();

describe('Test User Model', () => {
  describe('Test methods exist', () => {
    it('index method should be defined', () => {
      expect(userModel.index).toBeDefined();
    });

    it('create method should be defined', () => {
      expect(userModel.create).toBeDefined();
    });

    it('getOne method should be defined', () => {
      expect(userModel.getOne).toBeDefined();
    });

    it('delete method should be defined', () => {
      expect(userModel.delete).toBeDefined();
    });

    it('authenticate method should be defined', () => {
      expect(userModel.authenticate).toBeDefined();
    });
  });

  describe('test model methods behaviors', () => {
    const user = {
      user_name: 'test',
      email: 'test@email.com',
      first_name: 'first',
      last_name: 'last',
      password: 'test',
      gender: 'male',
    } as User;
    afterAll(async () => {
      const conn = await db.connect();
      const sql = 'DELETE FROM users;';
      await conn.query(sql);
      conn.release();
    });

    it('create should return created user', async () => {
      const result = await userModel.create(user);
      const { id, user_name, first_name, last_name, email, gender } = result;
      user.id = id as string;
      expect(user_name).toEqual(user.user_name);
      expect(first_name).toEqual(user.first_name);
      expect(last_name).toEqual(user.last_name);
      expect(email).toEqual(user.email);
      expect(gender).toEqual(user.gender);
    });

    it('index should return all users', async () => {
      const users = await userModel.index();
      const { id, user_name, first_name, last_name, email, gender } = users[0];
      expect(users.length).toBe(1);
      expect(id).toEqual(user.id as string);
      expect(user_name).toEqual(user.user_name);
      expect(first_name).toEqual(user.first_name);
      expect(last_name).toEqual(user.last_name);
      expect(email).toEqual(user.email);
      expect(gender).toEqual(user.gender);
    });

    it('getOne should get user with specific id', async () => {
      const result = await userModel.getOne(user.id as string);
      const { user_name, first_name, last_name, email, gender } = result;
      expect(user.user_name).toEqual(user_name);
      expect(user.first_name).toEqual(first_name);
      expect(user.last_name).toEqual(last_name);
      expect(user.email).toEqual(email);
      expect(user.gender).toEqual(gender);
    });

    it('update should return updated user', async () => {
      const result = await userModel.update(user.id as string, {
        ...user,
        user_name: 'new test',
        email: 'new@gmail.com',
      });
      const { user_name, first_name, last_name, email, gender } = result;
      expect(user_name).toEqual('new test');
      expect(first_name).toEqual(user.first_name);
      expect(last_name).toEqual(user.last_name);
      expect(email).toEqual('new@gmail.com');
      expect(gender).toEqual(user.gender);
    });
    describe('test auth method', () => {
      it('should authenticate user when write data provided', async () => {
        const result = await userModel.authenticate('new@gmail.com', 'test');
        const { user_name, first_name, last_name, email, gender } =
          result as User;
        expect(user_name).toEqual('new test');
        expect(first_name).toEqual(user.first_name);
        expect(last_name).toEqual(user.last_name);
        expect(email).toEqual('new@gmail.com');
        expect(gender).toEqual(user.gender);
      });

      it('should fail when wrong email is provided', async () => {
        const result = (await userModel.authenticate(
          user.email,
          user.password
        )) as Error;
        expect(result.status).toBe(422);
        expect(result.message).toBe('email is incorrect');
      });

      it('should fail when wrong password is provided', async () => {
        const result = (await userModel.authenticate(
          'new@gmail.com',
          'fake password'
        )) as Error;
        expect(result.status).toBe(422);
        expect(result.message).toBe('password is incorrect');
      });
    });

    it('delete method should delete user with specific id', async () => {
      const deleted = await userModel.delete(user.id as string);
      expect(deleted.status).toBe(200);
      expect(deleted.message).toBe('User deleted successfully');
    });
  });
});
