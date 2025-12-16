import pool from '../config/databaseConnection.js';

export const getOrders = async (req, res) => {
     try{
        const result = await pool.query(`SELECT co.order_id, co.user_id, co.order_status, oi.tart_id, oi.quantity FROM
            CustomerOrder co INNER JOIN OrderItems oi ON co.order_id = oi.order_id`);
        res.json(result.rows);
        console.log("admin is viewing orders...");
    } catch(err){
        res.status(500).json({error: "Failed to get tart orders"});
        console.error(err);
    
    }

};

export const changeOrderStatus = async (req, res) => {
    try{
        const result = await pool.query(`UPDATE CustomerOrder SET order_status = $1 WHERE order_id = $2 RETURNING *`, [req.query.order_status, req.query.order_id]);
        
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Item not found in cart" });
        }

        res.json(result.rows[0]);

    } catch(err){
        res.status(500).json({error: "Failed to change order status"});
    }
};


