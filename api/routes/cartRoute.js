import express from 'express';
import {
	addCart,
	deleteCartItem,
	getCart,
} from '../controllers/cartController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const cartRoute = express.Router();

cartRoute.post('/', verifyToken, addCart);
cartRoute.get('/', verifyToken, getCart);
cartRoute.delete('/:cartItem', verifyToken, deleteCartItem);

export default cartRoute;
