import UserModel from '../models/User.model';
import { Request, Response, NextFunction } from 'express';

const userModel = new UserModel();

export const index = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.index();
    if (!users[0]) {
      res.status(200).json({
        status: 404,
        message: 'no users found',
      });
    }
    res.status(200).json({
      status: 200,
      message: 'success',
      data: users,
    });
  } catch (e) {
    next(e);
  }
};
