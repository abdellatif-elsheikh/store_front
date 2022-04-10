import { Request, Response, NextFunction } from 'express';
import db from '../database';
import Error from '../interfaces/error.interface';

const regex =
  /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

const handelNoUser = (next: NextFunction): void => {
  const error: Error = new Error('user not found');
  error.status = 404;
  return next(error);
};

export const validateId = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const id = req.params.id;
    if (regex.test(id)) {
      const conn = await db.connect();
      const sql = 'SELECT id FROM users WHERE id = $1';
      const result = await conn.query(sql, [id]);
      if (result.rows[0]) {
        return next();
      }
      return handelNoUser(next);
    }
    return handelNoUser(next);
  } catch (error) {
    return handelNoUser(next);
  }
};

export default validateId;
