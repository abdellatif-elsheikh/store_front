import Product from '../../types/Product.type';
import User from '../../types/User.type';
import OrderModel from '../Order.model';
import OrderProductModel from '../OrderProduct.model';
import ProductModel from '../Product.model';
import UserModel from '../User.model';
import db from '../../database';

const orderProductModel = new OrderProductModel();

describe('order products model', () => {
  describe('test methods exist', () => {
    it('index method should be defined', () => {
      expect(orderProductModel.index).toBeDefined();
    });

    it('create method should be defined', () => {
      expect(orderProductModel.create).toBeDefined();
    });

    it('getOne method should be defined', () => {
      expect(orderProductModel.getOne).toBeDefined();
    });

    it('delete method should be defined', () => {
      expect(orderProductModel.delete).toBeDefined();
    });

    it('update method should be defined', () => {
      expect(orderProductModel.update).toBeDefined();
    });
  });

  describe('test order model methods behaviors', () => {
    let orderId: string;
    let oPId: string;
    const user = {
      user_name: 'test',
      email: 'test@email.com',
      first_name: 'first',
      last_name: 'last',
      password: 'test',
      gender: 'male',
    } as User;

    const product = {
      name: 'testProduct',
      price: 100,
      category: 'category',
    } as Product;
    beforeAll(async () => {
      const userModel = new UserModel();
      const productModel = new ProductModel();
      const orderModel = new OrderModel();
      const createdUser = await userModel.create(user);
      user.id = createdUser.id;
      const createProduct = await productModel.create(product);
      product.id = createProduct.id;
      const createOrder = await orderModel.create({
        user_id: user.id as string,
        status: 'active',
      });
      orderId = createOrder.id as string;
    });

    afterAll(async () => {
      const conn = await db.connect();
      const sql =
        'DELETE FROM order_products;\nDELETE FROM orders;\n DELETE FROM users;\n DELETE FROM products';
      await conn.query(sql);
      conn.release();
    });

    it('create method should create orderProduct', async () => {
      const result = await orderProductModel.create({
        order_id: orderId,
        product_id: product.id as unknown as string,
        quantity: 2,
      });
      oPId = result.id as string;
      expect(result.id).toEqual(oPId);
      expect(result.order_id).toEqual(orderId);
      expect(result.product_id).toEqual(product.id as unknown as string);
      expect(result.quantity).toBe(2);
    });

    it('index should return all available orders', async () => {
      const result = await orderProductModel.index();
      expect(result.length).toBe(1);
      expect(result[0].order_id).toEqual(orderId);
      expect(result[0].user).toEqual(user.user_name);
      expect(result[0].product.id).toEqual(product.id as unknown as string);
      expect(result[0].product.category).toEqual(product.category);
      expect(result[0].product.quantity).toEqual(2);
    });

    it('getOne method should return specific order_product', async () => {
      const result = await orderProductModel.getOne(
        orderId,
        product.id as unknown as string
      );

      expect(result.category).toEqual(product.category as string);
      expect(result.user).toEqual(user.user_name);
    });

    it('update method should update orderProduct with givin id', async () => {
      const result = await orderProductModel.update(oPId, {
        order_id: orderId,
        product_id: product.id as unknown as string,
        quantity: 4,
      });
      expect(result.id).toEqual(oPId);
      expect(result.order_id).toEqual(orderId);
      expect(result.product_id).toEqual(product.id as unknown as string);
      expect(result.quantity).toBe(4);
    });

    it('delete method should delete order product with givin id', async () => {
      const deleted = await orderProductModel.delete(oPId);
      expect(deleted.status).toBe(200);
      expect(deleted.message).toEqual('order_product deleted');
    });
  });
});
