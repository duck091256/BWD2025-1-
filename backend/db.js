import mysql from 'mysql2/promise';

const poolLocalhost = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bwd',
});

const poolDeploy = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }, // Bắt buộc nếu Railway yêu cầu SSL
  waitForConnections: true,
  connectionLimit: 10,
});

console.log("🔍 DB config:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const query = (sql, params) => {
  return poolDeploy.execute(sql, params);
};