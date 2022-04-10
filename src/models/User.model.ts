import db from '../database';
import User from '../types/User.type';
import Error from '../interfaces/error.interface';
import { hashPassword } from '../handlers/User.handler';

class UserModel {
  async index(): Promise<User[]> {
    try {
      const conn = await db.connect();
      const sql =
        'SELECT id, user_name, first_name, last_name, email, gender FROM users';
      const users = await conn.query(sql);
      conn.release();
      return users.rows;
    } catch (error) {
      throw new Error(`unable to get users Error: ${(error as Error).message}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await db.connect();
      const sql = `INSERT INTO users(user_name, first_name, last_name, email, password, gender)
      VALUES ($1,$2,$3,$4,$5,$6) returning id, user_name, first_name, last_name, email, gender`;
      const user = await conn.query(sql, [
        u.user_name,
        u.first_name,
        u.last_name,
        u.email,
        hashPassword(u.password),
        u.gender,
      ]);
      conn.release();
      return user.rows[0];
    } catch (error) {
      throw new Error(
        `unable to create user Error: ${(error as Error).message}`
      );
    }
  }

  async getOne(id: string): Promise<User> {
    try {
      const conn = await db.connect();
      const sql =
        'SELECT user_name, first_name, last_name, email, gender FROM users WHERE id = $1';
      const users = await conn.query(sql, [id]);
      conn.release();
      return users.rows[0];
    } catch (error) {
      throw new Error(`unable to get user Error: ${(error as Error).message}`);
    }
  }
}

export default UserModel;
