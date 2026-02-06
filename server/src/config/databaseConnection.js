// const { Pool } = require('pg');
// require("dotenv").config();
import dotenv from "dotenv";
import pg from "pg";

dotenv.config()
const {Pool}=pg




const pool = new Pool();

// module.exports = pool;
export default pool;