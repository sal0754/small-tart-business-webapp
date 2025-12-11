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
    // Sending json response 
    res.json(result.rows);
    console.log("specific tart selected")
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }

})

// Route for Adding Tarts (Admin only-i.e tart business owners only)
router.get("/tarts/add-tart", async (req, res) => {
  try{
    const result = await pool.query(`INSERT INTO Tart (price, tart_type, tart_name,image_url,tart_description)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [req.query.price, req.query.tart_type, req.query.tart_name, req.query.image_url, req.query.tart_description]);
  } catch(err){
    res.status(500).json({error: "Server Error"});
  }
})

// Route for Deleting Tarts
router.get("/tarts/delete-tart", async (req, res) => {
  try {
    const tartId = req.query.tart_id;

    const result = await pool.query(
      `DELETE FROM Tart WHERE tart_id = $1 RETURNING *`,
      [tartId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Tart not found" });
    }

    res.json({
      message: "Tart deleted successfully",
      deletedTart: result.rows[0],
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// Route for Updating Tart Information
router.get("/tarts/edit-tart", async (req, res) => {
  try {
    const tartId = req.query.tart_id;

    const fields = [];
    const values = [];
    let index = 1;

    // Building a dymanic SQL query based on user input (i.e which fields are edited)
    for (const key in req.query) {
      if (key === "tart_id") continue; 
      fields.push(`${key} = $${index}`);
      values.push(req.query[key]);
      index++;
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "No fields provided to update" });
    }

    values.push(tartId);

    const query = `
      UPDATE Tart
      SET ${fields.join(", ")}
      WHERE tart_id = $${index}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Tart not found" });
    }

    res.json({
      message: "Tart updated successfully",
      updatedTart: result.rows[0],
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// Route to apply search filters based on price, category
// And sort tarts alphabetically
router.get("/tarts/search-tarts", async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sort } = req.query;

    let filters = [];
    let values = [];
    let index = 1;

    if (category) {
      filters.push(`tart_type = $${index}`);
      values.push(category);
      index++;
    }

    if (minPrice) {
      filters.push(`price >= $${index}`);
      values.push(minPrice);
      index++;
    }

    if (maxPrice) {
      filters.push(`price <= $${index}`);
      values.push(maxPrice);
      index++;
    }

    let query = `SELECT * FROM Tart`;

    if (filters.length > 0) {
      query += " WHERE " + filters.join(" AND ");
    }

    if (sort === "asc") {
      query += " ORDER BY tart_name ASC";
    } else if (sort === "desc") {
      query += " ORDER BY tart_name DESC";
    }

    const result = await pool.query(query, values);

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});