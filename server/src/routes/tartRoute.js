const { Router } = require("express");
const router = require("express").Router()
const pool = require("../config/databaseConnection.js")

// Route to view all the tarts available
router.get("/tarts", async (req, res) => {
  try {
    // Query to get the tart_name and price for every tart in the Tart table
    const result = await pool.query("SELECT tart_name, price, tart_type FROM Tart");
    res.json(result.rows);
    console.log("tarts selected from tart table in db")
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Route to view more information about a specific tart
router.get("/tarts/preview-tart", async (req, res) => {
    // Checking if the specific tart exists in the database
    try {
          const { tart_id } = req.query; 

    if (!tart_id) {
      return res.status(400).json({ error: "Missing tart_id" });
    }
    // This query gets the description of the tart alongisde other
    // Additional information for a specific tart
    const result = await pool.query("SELECT tart_name, price, tart_type, tart_description, image_url FROM Tart WHERE tart_id = $1", [req.query.tart_id]);
    // Writing Result to JSON
    res.json(result.rows);
    console.log("specific tart selected")
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }

})

