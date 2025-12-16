const { Router } = require("express");
const router = require("express").Router()
const pool = require("../config/databaseConnection.js");
const { Query } = require("pg");

router.get("\adminOrders\admin-view-orders", async (req, res)=>{
    try{
        const result = pool.query(`SELECT co.order_id, co.user_id, co.order_status, oi.tart_id, oi.quantity FROM
            CustomerOrder co INNER JOIN OrderItems oi ON co.order_id = oi.order_id`);
        res.json(result.rows);
        console.log("admin is viewing orders...");
    } catch(err){
        res.status(500).json({error: "Failed to get tart orders"});

    }
    
    
});

router.get("\adminOrders\change-order-status", async (req, res)=>{
    try{
        const result = pool.query(`UPDATE CustomerOrder SET order_status = $1 WHERE order_id = $2`, [req.query.order_status, req.query.order_id]);
        
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Item not found in cart" });
        }
        // Sending JSON response
        res.json(result.rows[0]);

    } catch(err){
        res.status(500).json({error: "Failed to change order status"})
    }

});
