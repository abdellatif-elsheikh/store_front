import db from '../database';
import Product from '../types/Product.type';
import Error from '../interfaces/error.interface';

class ProductModel {
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
}

export default ProductModel;
