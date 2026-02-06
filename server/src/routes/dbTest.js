import express from "express";
import pool from '../config/databaseConnection.js';


const router = express.Router()
// const { Pool } = pg

// const pool = new Pool()

router.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()")
    res.json({
      success: true,
      time: result.rows[0].now
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      error: err.message
    })
  }
})

export default router