const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Client } = require('pg');
const pool = require('./config/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

async function ensureDatabaseExists() {
  const admin = new Client({ user: dbUser, password: dbPassword, host: dbHost, port: dbPort, database: 'postgres' });
  await admin.connect();
  try {
    const { rows } = await admin.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);
    if (rows.length === 0) {
      await admin.query(`CREATE DATABASE ${dbName}`);
      console.log(`Created database ${dbName}`);
    }
  } finally {
    await admin.end();
  }
}

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 4000;

