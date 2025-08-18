const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'students_db',
  password: process.env.DB_PASSWORD || '2422',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
});

module.exports = pool;


