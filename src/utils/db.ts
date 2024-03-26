// utils/db.ts
import { createPool } from 'mysql';

const pool = createPool({
  host: 'your_database_host',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name',
  connectionLimit: 10
});

export const query = (sql: string, values?: any) => new Promise((resolve, reject) => {
  pool.query(sql, values, (error, results) => {
    if (error) return reject(error);
    resolve(results);
  });
});
