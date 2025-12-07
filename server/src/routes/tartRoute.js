const { Router } = require("express");
const router = require("express").Router()
const pool = require("../config/databaseConnection.js")

router.get("/tarts", async (req, res) => {
  try {
    const result = await pool.query("SELECT tart_type, price FROM Tart");
    res.json(result.rows);
    console.log("tarts selected from tart table in db")
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});