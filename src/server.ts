import express, { Application } from 'express';
import config from './config';

const app: Application = express();

const PORT = config.port;
const HOST = config.host;

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`app is running at http://${HOST}:${PORT}`);
});
