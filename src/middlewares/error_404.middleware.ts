import { Request, Response } from 'express';
import config from '../config';

const PORT = config.port;
const HOST = config.host;

const notFound = (_req: Request, res: Response) => {
  res.status(404).json({
    message: `you are lost you can go back to Home http://${HOST}:${PORT}/`,
  });
};

export default notFound;
