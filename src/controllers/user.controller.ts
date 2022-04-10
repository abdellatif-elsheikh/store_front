import UserModel from '../models/User.model';
import { Request, Response, NextFunction } from 'express';
import { schema, ValidateUserExists } from '../handlers/User.handler';
import Error from '../interfaces/error.interface';
import config from '../config';
import Jwt from 'jsonwebtoken';

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
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dataInput = await req.body;
    const email = dataInput.email;
    const userName = dataInput.user_name;
    let checkUser = await ValidateUserExists(email, userName);
    if (checkUser) {
      checkUser = checkUser as Error;
      return res.status(checkUser.status).json({
        checkUser,
      });
    }
    const validation = schema.validate(dataInput);
    if (validation.error) {
      return res.status(422).json({
        status: 422,
        message: validation.error.message,
      });
    }
    const user = await userModel.create(dataInput);
    const access_token = Jwt.sign({ user }, config.token as string);
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: { ...user, access_token },
    });
  } catch (error) {
    next(error);
  }
};
