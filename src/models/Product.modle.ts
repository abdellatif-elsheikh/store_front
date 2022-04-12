import db from '../database';
import Product from '../types/Product.type';
import Error from '../interfaces/error.interface';

class ProductModel {
  columns = 'name, price, category';
  async index(): Promise<Product[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM products';
      const products = await conn.query(sql);

      conn.release();
      return products.rows;
    } catch (error) {
      throw new Error(
        `something went wrong Error: ${(error as Error).message}`
      );
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const conn = await db.connect();
      const sql = `INSERT INTO products (${this.columns}) VALUES ($1, $2, $3) RETURNING *`;
      const values = [p.name, p.price, p.category];
      const product = await conn.query(sql, values);

      conn.release();
      return product.rows[0];
    } catch (error) {
      throw new Error(
        `something went wrong Error: ${(error as Error).message}`
      );
    }
  }

  async getOne(id: number): Promise<Product> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM products WHERE id = $1';
      const product = await conn.query(sql, [id]);

      conn.release();
      return product.rows[0];
    } catch (error) {
      throw new Error(
        `something went wrong Error: ${(error as Error).message}`
      );
    }
  }

  async update(id: number, p: Product): Promise<Product> {
    try {
      const conn = await db.connect();
      const sql =
        'UPDATE products SET name = $1, price = $2, category = $3 WHERE id = $4 RETURNING *';
      const values = [p.name, p.price, p.category, id];
      const product = await conn.query(sql, values);

      conn.release();
      return product.rows[0];
    } catch (error) {
      throw new Error(
        `something went wrong Error: ${(error as Error).message}`
      );
    }
  }

  async delete(id: number): Promise<{ status: number; message: string }> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM products WHERE id = $1 RETURNING *';
      await conn.query(sql, [id]);

      conn.release();
      return {
        status: 200,
        message: 'Product deleted successfully',
      };
    } catch (error) {
      throw new Error(
        `something went wrong Error: ${(error as Error).message}`
      );
    }
  }
}

export default ProductModel;
