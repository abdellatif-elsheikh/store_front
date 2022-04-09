import { Pool } from 'pg';
import config from '../config';
const pool = new Pool({
  host: config.dbHost,
  port: parseInt(config.dbPort as string),
  user: config.user,
  password: config.password,
  database: config.database,
});

export default pool;
