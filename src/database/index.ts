import { Pool } from 'pg';
import config from '../config';
const pool = new Pool({
  host: config.dbHost,
  port: parseInt(config.dbPort as string, 10),
  user: config.user,
  password: config.password,
  database: config.database,
});

pool.on('error', (error) => {
  // eslint-disable-next-line no-console
  console.error(`Error: ${error.message}`);
});

export default pool;
