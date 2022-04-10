import db from '../database';
import Joi from 'joi';
import Error from '../interfaces/error.interface';
import bcrypt from 'bcrypt';
import config from '../config';

export const schema = Joi.object({
  user_name: Joi.string().trim().min(3).max(50).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'yahoo'] } })
    .min(3)
    .max(50)
    .required(),
  password: Joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9]{3,40}$')),
  first_name: Joi.string().trim().min(2).max(50).required(),
  last_name: Joi.string().trim().min(2).max(50).required(),
  gender: Joi.string().valid('male', 'female'),
});

export const ValidateUserExists = async (
  email: string,
  userName: string
): Promise<Error | boolean> => {
  const conn = await db.connect();
  const emailSql = 'SELECT email FROM users WHERE email = $1';
  const userNameSql = 'SELECT user_name FROM users WHERE user_name = $1';
  const emailResult = await conn.query(emailSql, [email]);
  const userNameResult = await conn.query(userNameSql, [userName]);
  if (emailResult.rows[0]) {
    return {
      status: 400,
      message: 'this email is already used',
    };
  } else if (userNameResult.rows[0]) {
    return {
      status: 400,
      message: `user name ${userName} is used before please try another one`,
    };
  }
  return false;
};

export const hashPassword = (password: string): string => {
  const salt = parseInt(config.salt as string);
  return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};

const regex =
  /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

export const validateId = async (id: string): Promise<boolean> => {
  try {
    if (regex.test(id)) {
      const conn = await db.connect();
      const sql = 'SELECT id FROM users WHERE id = $1';
      const result = await conn.query(sql, [id]);
      if (result.rows[0]) {
        return true;
      }
      return false;
    }
    return false;
  } catch (error) {
    throw new Error(
      `this user is not found Error: ${(error as Error).stack} ${
        (error as Error).message
      } `
    );
  }
};
