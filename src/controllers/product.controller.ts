import ProductModel from '../models/Product.modle';
import { Request, Response, NextFunction } from 'express';

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
