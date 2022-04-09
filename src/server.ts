import express, { Application } from 'express';

const app: Application = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`app is running at http://localhost:${PORT}`);
});
