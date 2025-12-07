const { Router } = require("express");
const router = require("express").Router()
const pool = require("../config/databaseConnection.js")

// helper function to get total price of items in a cart
async function getTotalPrice(cart_id){
    const result = await pool.query(`SELECT SUM(t.price * ct.quantity) AS total_cost FROM Tart t INNER JOIN cart_items ct ON t.tart_id = ct.tart_id WHERE ct.cart_id = $1`, [cart_id]);
    return result.rows[0].total_cost || 0;
}

// cart route to see all the tarts in the cart
router.get("/carts", async (req, res) => {
    try {
        const result = await pool.query("SELECT t.tart_id, t.tart_type, t.price FROM Tart t INNER JOIN cart_items ct ON t.tart_id = ct.tart_id");
        res.json(result.rows);
        console.log("showing items in cart")
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// route to get the total cost of tarts inside the cart
router.get("/carts/total_cost", async (req, res) => {
    try {
        const result = getTotalPrice(req.query.cart_id);
        res.json(result.rows);
        console.log("showing items in cart")
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
})

// Route to add items to cart by inserting into the cart_items table
router.get("/carts/add_to_cart", async (req, res) => {
     try {
        const result = await pool.query(
            `INSERT INTO cart_items (cart_id, tart_id, quantity)
             VALUES ($1, $2, 1)
             RETURNING *`,
            [req.query.cart_id, req.query.tart_id]
        );
        console.log("added item to cart")
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }

})

// Route to delete items from the cart
router.get("/carts/delete_from_cart", async (req, res) => {
    try{
        const result = await pool.query("DELETE FROM cart_items WHERE cart_id = $1 AND tart_id = $2", [req.query.cart_id, req.query.tart_id]);
        res.json(result)
        console.log("deleted from cart");
    }
    catch{
        res.status(500).json({error: "Server Error"});
    }
})

