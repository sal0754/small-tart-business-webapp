const { Pool } = require('pg');
require("dotenv").config();

const pool = Pool();

// Using env variables to hide database connection details
pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

module.exports = pool;