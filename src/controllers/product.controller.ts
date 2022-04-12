import ProductModel from '../models/Product.model';
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

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const id = req.params.id as unknown as number;
    const product = await productModel.getOne(id);
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: product,
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
    const dataInput = await req.body;
    const validation = schema.validate(dataInput);
    if (validation.error) {
      return res.status(422).json({
        status: 422,
        message: validation.error.message,
      });
    }
    const id = req.params.id as unknown as number;
    const product = await productModel.update(id, dataInput);
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const id = req.params.id as unknown as number;
    const deleted = await productModel.delete(id);
    return res.status(200).json({
      deleted,
    });
  } catch (error) {
    next(error);
  }
};
