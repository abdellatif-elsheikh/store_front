import OrderProductModel from '../models/OrderProduct.model';
import { Request, Response, NextFunction } from 'express';

const orderProductModel = new OrderProductModel();

export const index = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const orderProducts = await orderProductModel.index();
    if (orderProducts.length > 0) {
      return res.status(200).json({
        status: 200,
        message: 'success',
        data: [...orderProducts],
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'No orderProducts found',
    });
  } catch (error) {
    next(error);
  }
};

export const create = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const orderProduct = await orderProductModel.create(_req.body);
    return res.status(201).json({
      status: 201,
      message: 'success',
      data: { ...orderProduct },
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const orderProduct = await orderProductModel.getOne(
      _req.params.order_id,
      _req.params.product_id
    );
    if (orderProduct) {
      return res.status(200).json({
        status: 200,
        message: 'success',
        data: { ...orderProduct },
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'No orderProduct found',
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
    const orderProduct = await orderProductModel.update(
      req.params.id,
      req.body
    );
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: { ...orderProduct },
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
    const deleted = await orderProductModel.delete(req.params.id);
    return res.status(200).json({
      deleted,
    });
  } catch (error) {
    next(error);
  }
};
