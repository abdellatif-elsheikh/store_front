import OrderModel from '../Order.model';
import db from '../../database';
import User from '../../types/User.type';
import UserModel from '../User.model';

const orderModel = new OrderModel();

describe('Order model', () => {
  describe('Test methods exist', () => {
    it('index method should be defined', () => {
      expect(orderModel.index).toBeDefined();
    });

    it('create method should be defined', () => {
      expect(orderModel.create).toBeDefined();
    });

    it('getOne method should be defined', () => {
      expect(orderModel.getOne).toBeDefined();
    });

    it('delete method should be defined', () => {
      expect(orderModel.delete).toBeDefined();
    });

    it('update method should be defined', () => {
      expect(orderModel.update).toBeDefined();
    });

    it('getOrdersByUserId method should be defined', () => {
      expect(orderModel.getOrdersByUserId).toBeDefined();
    });

    describe('test order model methods behaviors', () => {
      let orderId: string;
      const user = {
        user_name: 'test',
        email: 'test@email.com',
        first_name: 'first',
        last_name: 'last',
        password: 'test',
        gender: 'male',
      } as User;
      beforeAll(async () => {
        const userModel = new UserModel();
        const createdUser = await userModel.create(user);
        user.id = createdUser.id;
      });

      afterAll(async () => {
        const conn = await db.connect();
        const sql = 'DELETE FROM orders;\n DELETE FROM users;';
        await conn.query(sql);
        conn.release();
      });

      it('create method should create new order', async () => {
        const result = await orderModel.create({
          user_id: user.id as string,
          status: 'active',
        });
        orderId = result.id as string;
        expect(result.user_id).toEqual(user.id as string);
        expect(result.status).toBe('active');
      });

      it('index method should get all available orders', async () => {
        const orders = await orderModel.index();
        expect(orders.length).toEqual(1);
        expect(orders[0].id).toEqual(orderId);
        expect(orders[0].user_id).toEqual(user.id as string);
        expect(orders[0].status).toEqual('active');
      });

      it('getOne method should get order with givin id', async () => {
        const result = await orderModel.getOne(orderId);
        expect(result.user_id).toEqual(user.id as string);
        expect(result.status).toBe('active');
      });
      it('update method should update order with givin id', async () => {
        const result = await orderModel.update(orderId, {
          user_id: user.id as string,
          status: 'complete',
        });
        orderId = result.id as string;
        expect(result.user_id).toEqual(user.id as string);
        expect(result.status).toBe('complete');
      });

      it('getOrdersByUserId should get all orders associated with user id', async () => {
        const orders = await orderModel.getOrdersByUserId(user.id as string);
        expect((orders[0] as unknown as User).user_name).toEqual(
          user.user_name
        );
        expect(orders[0].user_id).toEqual(user.id as string);
        expect(orders[0].status).toEqual('complete');
      });
    });
  });
});
