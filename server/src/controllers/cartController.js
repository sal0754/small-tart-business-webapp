import pool from '../config/databaseConnection.js';

// Helper function to get total price of items in a cart
async function getTotalPrice(cart_id){
    const result = await pool.query(`SELECT SUM(t.price * ct.quantity) AS total_cost FROM Tart t INNER JOIN cart_items ct ON t.tart_id = ct.tart_id WHERE ct.cart_id = $1`, [cart_id]);
    return result.rows[0].total_cost || 0;
}

export const viewTarts = async (req, res) => {
    try {
        const result = await pool.query("SELECT t.tart_id, t.tart_type, t.price FROM Tart t INNER JOIN cart_items ct ON t.tart_id = ct.tart_id");
        res.json(result.rows);
        console.log("showing items in cart")
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

export const getTotalCost = async (req, res) => {
    try {
        const result = getTotalPrice(req.query.cart_id);
        res.json(result.rows);
        console.log("showing items in cart")
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

export const addToCart = async (req, res)=>{
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
}

export const deleteFromCart = async (req, res)=>{
    try{
        const result = await pool.query("DELETE FROM cart_items WHERE cart_id = $1 AND tart_id = $2", [req.query.cart_id, req.query.tart_id]);
        res.json(result)
        console.log("deleted from cart");
    }
    catch{
        res.status(500).json({error: "Server Error"});
    }
};

export const updateItemQuantity = async (req, res) => {
    const { cart_id, tart_id, quantity } = req.body;

    try {
        // Sql query to update cart_items quantity row
        const result = await pool.query(
            `UPDATE cart_items
             SET quantity = $1
             WHERE cart_id = $2 AND tart_id = $3
             RETURNING *`,
            [quantity, cart_id, tart_id]
        );
        
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Item not found in cart" });
        }
        // Sending JSON response
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }

};

