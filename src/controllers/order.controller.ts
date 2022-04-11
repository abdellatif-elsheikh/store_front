import { Request, Response, NextFunction } from 'express';
import { schema } from '../handlers/Order.handler';
import OrderModel from '../models/Order.model';

const orderModel = new OrderModel();

export const index = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const orders = await orderModel.index();
    if (!orders[0]) {
      return res.status(404).json({
        status: 404,
        message: 'no orders found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const validate = schema.validate(req.body);
    if (validate.error) {
      return res.status(422).json({
        status: 422,
        message: validate.error.message,
      });
    }
    const order = await orderModel.create(req.body);
    return res.status(201).json({
      status: 201,
      message: 'success',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const { id } = req.params;
    const order = await orderModel.getOne(id);
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const { id } = req.params;
    const validate = schema.validate(req.body);
    if (validate.error) {
      return res.status(422).json({
        status: 422,
        message: validate.error.message,
      });
    }
    const order = await orderModel.update(id, req.body);
    return res.status(201).json({
      status: 201,
      message: 'success',
      data: { ...order },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const { id } = req.params;
    const deleted = await orderModel.delete(id);
    return res.status(200).json({
      deleted,
    });
  } catch (error) {
    next(error);
  }
};
