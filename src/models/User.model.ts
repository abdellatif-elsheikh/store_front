import db from '../database';
import User from '../types/User.type';
import Error from '../interfaces/error.interface';

class UserModel {
  async index(): Promise<User[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM users';
      const user = await conn.query(sql);
      return user.rows;
    } catch (error) {
      throw new Error(`unable to get users Error: ${(error as Error).message}`);
    }
  }
}

export default UserModel;
