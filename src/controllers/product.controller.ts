import ProductModel from '../models/Product.modle';
import { Request, Response, NextFunction } from 'express';
import { schema } from '../handlers/Product.handler';

const productModel = new ProductModel();

export const index = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const products = await productModel.index();
    if (!products[0]) {
      return res.status(404).json({
        status: 404,
        message: 'no products found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: products,
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
    const validation = schema.validate(_req.body);
    if (validation.error) {
      return res.status(422).json({
        status: 422,
        message: validation.error.message,
      });
    }
    const product = await productModel.create(_req.body);
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
