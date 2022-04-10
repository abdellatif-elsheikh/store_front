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
}

export default ProductModel;
