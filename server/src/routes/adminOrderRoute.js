import { Router } from 'express';
import {getAllOrders, changeOrderStatus} from '../controllers/adminOrderController.js';

const router = Router();

router.get("/adminOrders/admin-view-orders", getAllOrders);

router.get("/adminOrders/change-order-status", changeOrderStatus);

export default router;
