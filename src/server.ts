import express, { Application } from 'express';
import config from './config';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from './middlewares/rateLimit.middleware';
import errorMiddleware from './middlewares/error.middleware';
import error_404 from './middlewares/error_404.middleware';

const app: Application = express();

const PORT = config.port;
const HOST = config.host;

// Use main middlewares
app.use(
  express.json(),
  morgan('common'),
  helmet(),
  cors(),
  rateLimit,
  errorMiddleware
);

app.get('/', (_req, res) => {
  res.status(200).send('hello');
});

app.use(error_404, errorMiddleware);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`app is running at http://${HOST}:${PORT}`);
});
