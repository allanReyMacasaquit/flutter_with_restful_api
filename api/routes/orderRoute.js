import express from 'express';
import { getUserOrders } from '../controllers/ordersController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const orderRoute = express.Router();

orderRoute.get('/', verifyToken, getUserOrders);

export default orderRoute;
