import db from '../database';
import Error from '../interfaces/error.interface';
import Order from '../types/Order.type';

class OrderModel {
  async index(): Promise<Order[]> {
    try {
      const conn = await db.connect();
      const orders = await conn.query('SELECT * FROM orders');
      conn.release();
      return orders.rows;
    } catch (error) {
      throw new Error(`can't get orders Error ${(error as Error).message}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
      const result = await conn.query(sql, [order.status, order.user_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`can't create order Error ${(error as Error).message}`);
    }
  }

  async getOne(id: string): Promise<Order> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM orders WHERE id = $1';
      const order = await conn.query(sql, [id]);
      conn.release();
      return order.rows[0];
    } catch (error) {
      throw new Error(`order not found Error ${(error as Error).message}`);
    }
  }

  async update(id: string, o: Order): Promise<Order> {
    try {
      const conn = await db.connect();
      const sql =
        'UPDATE orders SET status = $1, user_id = $2 WHERE id = $3 returning *';
      const values = [o.status, o.user_id, id];
      const result = await conn.query(sql, values);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`cant update this order ${(error as Error).message}`);
    }
  }

  async delete(id: string): Promise<{ status: number; message: string }> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM orders WHERE id = $1';
      await conn.query(sql, [id]);
      conn.release();
      return {
        status: 200,
        message: 'success',
      };
    } catch (error) {
      throw new Error(`cant delete this order ${(error as Error).message}`);
    }
  }
}
export default OrderModel;
