import db from '../database';
import OrderProduct from '../types/OrderProduct.type';
import ReturenOP from '../types/Op.type';

class OrderProductModel {
  async index(): Promise<ReturenOP[]> {
    try {
      const conn = await db.connect();
      const sql = `SELECT op.id as id, op.order_id as order_id, u.id as use_id, u.user_name as user, JSON_BUILD_OBJECT('id', p.id, 'name', p.name, 'price', p.price, 'category' ,p.category ,'quantity', op.quantity) as product
      FROM order_products as op LEFT JOIN products as p ON op.product_id = p.id
      LEFT JOIN orders as o ON op.order_id = o.id
      LEFT JOIN users as u ON o.user_id = u.id
      GROUP BY op.id, p.id, u.id`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Error on index OrderProduct: ${(error as Error).message}`
      );
    }
  }

  async create(oP: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [
        oP.order_id,
        oP.product_id,
        oP.quantity,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Error on create OrderProduct: ${(error as Error).message}`
      );
    }
  }

  async getOne(
    order_id: string,
    product_id: string
  ): Promise<{
    id: string;
    order_id: string;
    product_id: string;
    user_id: string;
    user: string;
    quantity: number;
    product_name: string;
    product_price: number;
    category: string;
  }> {
    try {
      const conn = await db.connect();
      const sql = `SELECT op.id as id, op.order_id as order_id, op.product_id as product_id, u.id as user_id, u.user_name as user, op.quantity as quantity,
        p.name as product_name, p.price as product_price , p.category as category
        FROM order_products op LEFT JOIN products p ON op.product_id = p.id
        LEFT JOIN orders o ON op.order_id = o.id
        LEFT JOIN users u ON o.user_id = u.id
        WHERE op.order_id = $1 AND op.product_id = $2
        `;
      const result = await conn.query(sql, [order_id, product_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Error on getOne OrderProduct: ${(error as Error).message}`
      );
    }
  }

  async update(id: string, oP: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await db.connect();
      const sql =
        'UPDATE order_products SET quantity = $1, product_id= $2, order_id=$3  WHERE id = $4 RETURNING *';
      const result = await conn.query(sql, [
        oP.quantity,
        oP.product_id,
        oP.order_id,
        id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Error on update OrderProduct: ${(error as Error).message}`
      );
    }
  }

  async delete(id: string): Promise<{ status: number; message: string }> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM order_products WHERE id = $1';
      await conn.query(sql, [id]);
      conn.release();
      return {
        status: 200,
        message: 'order_product deleted',
      };
    } catch (error) {
      throw new Error(
        `Error on delete OrderProduct: ${(error as Error).message}`
      );
    }
  }
}

export default OrderProductModel;
