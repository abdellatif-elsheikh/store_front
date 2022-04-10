import db from '../database';
import User from '../types/User.type';
import Error from '../interfaces/error.interface';
import { hashPassword } from '../handlers/User.handler';
import bcrypt from 'bcrypt';
import config from '../config';

class UserModel {
  commonSelect = 'id, user_name, first_name, last_name, email, gender';

  async index(): Promise<User[]> {
    try {
      const conn = await db.connect();
      const sql = `SELECT ${this.commonSelect} FROM users`;
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
      VALUES ($1,$2,$3,$4,$5,$6) returning ${this.commonSelect}`;
      const values = [
        u.user_name,
        u.first_name,
        u.last_name,
        u.email,
        hashPassword(u.password),
        u.gender,
      ];
      const user = await conn.query(sql, values);
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
      const sql = `SELECT ${this.commonSelect} FROM users WHERE id = $1`;
      const users = await conn.query(sql, [id]);
      conn.release();
      return users.rows[0];
    } catch (error) {
      throw new Error(`unable to get user Error: ${(error as Error).message}`);
    }
  }

  async update(id: string, u: User): Promise<User> {
    try {
      const conn = await db.connect();
      const sql = `UPDATE users SET user_name = $1, first_name = $2, last_name = $3, email = $4,
    password = $5, gender = $6 WHERE id = $7 returning ${this.commonSelect}`;
      const values = [
        u.user_name,
        u.first_name,
        u.last_name,
        u.email,
        hashPassword(u.password),
        u.gender,
        id,
      ];
      const user = await conn.query(sql, values);

      conn.release();
      return user.rows[0];
    } catch (error) {
      throw new Error(
        `something went wrong Error: ${(error as Error).message}`
      );
    }
  }

  async delete(id: string): Promise<{ status: number; message: string }> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM users WHERE id = $1';
      await conn.query(sql, [id]);
      return {
        status: 200,
        message: 'success',
      };
    } catch (error) {
      throw new Error(
        `something went wrong Error: ${(error as Error).message}`
      );
    }
  }

  async authenticate(email: string, password: string): Promise<User | Error> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT password FROM users WHERE email = $1';
      const result = await conn.query(sql, [email]);
      if (result.rows[0]) {
        const { password: hashPassword } = result.rows[0];
        const isValid = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashPassword
        );

        if (isValid) {
          const sql = `SELECT ${this.commonSelect} FROM users WHERE email = $1`;
          const user = await conn.query(sql, [email]);
          conn.release();
          return user.rows[0];
        }
        conn.release();
        return {
          status: 422,
          message: 'password is incorrect',
        };
      }
      conn.release();
      return {
        status: 422,
        message: 'email is incorrect',
      };
    } catch (error) {
      throw new Error(
        `something went wrong Error: ${(error as Error).message}`
      );
    }
  }
}

export default UserModel;
