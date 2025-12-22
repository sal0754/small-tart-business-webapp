import { Router } from 'express';
import {viewTarts, 
  previewTarts, 
  addTarts, 
  deleteTarts, 
  editTarts, 
  searchTarts,
  orderTarts
} from '../controllers/tartController.js';

const router = Router();

// Route to view all the tarts available
router.get("/tarts", viewTarts);

// Route to view more information about a specific tart
router.get("/tarts/preview-tart", previewTarts)

// Route for Adding Tarts (Admin only-i.e tart business owners only)
router.get("/tarts/add-tart", addTarts)

// Route for Deleting Tarts
router.get("/tarts/delete-tart", deleteTarts);

// Route for Updating Tart Information
router.get("/tarts/edit-tart", editTarts);

//Route for searching tarts and applying search filters
router.get("/tarts/search-tart", searchTarts);

//Route for ordering tarts
router.get("/tarts/order-tart", orderTarts);