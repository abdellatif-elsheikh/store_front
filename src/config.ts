import dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
  HOST,
  NODE_ENV,
  POSTGRES_PORT,
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASS,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
} = process.env;

export default {
  port: PORT,
  dbPort: POSTGRES_PORT,
  host: HOST,
  dbHost: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASS,
  database: NODE_ENV === 'test' ? POSTGRES_DB_TEST : POSTGRES_DB,
};
