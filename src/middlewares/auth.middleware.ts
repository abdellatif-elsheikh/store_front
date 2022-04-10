import { Request, Response, NextFunction } from 'express';
import Jwt from 'jsonwebtoken';
import config from '../config';
import Error from '../interfaces/error.interface';

const handelUnAuthorized = (next: NextFunction): void => {
  const error: Error = new Error('you are not authorized please login first');
  error.status = 401;
  return next(error);
};

const validateToken = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.get('Authorization');
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const isValid = Jwt.verify(token, config.secretToken as string);
      if (isValid) {
        return next();
      }
      return handelUnAuthorized(next);
    }

    return handelUnAuthorized(next);
  } catch (error) {
    handelUnAuthorized(next);
  }
};

export default validateToken;
