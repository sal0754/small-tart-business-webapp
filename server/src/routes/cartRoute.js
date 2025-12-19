//======= Cart CRUD =======

// Importing express and databaseConnection file to connect to the DB
// const { Router } = require("express");
// const router = require("express").Router()
// const pool = require("../config/databaseConnection.js")
import { Router } from 'express';
import {getTotalCost, 
    viewTarts, 
    addToCart, 
    deleteFromCart, 
    updateItemQuantity
} from '../controllers/cartController.js';

const router = Router();

// Cart route to see all the tarts in the cart
router.get("/carts", viewTarts);

// Route to get the total cost of tarts inside the cart
router.get("/carts/total_cost", getTotalCost)

// Route to add items to cart by inserting into the cart_items table
router.get("/carts/add_to_cart", addToCart)

// Route to delete items from the cart
router.get("/carts/delete_from_cart", deleteFromCart)

// Updating quantity of an item already in the cart
router.put("/carts/update_quantity", updateItemQuantity);

