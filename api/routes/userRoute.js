import express from 'express';
import {
	deleteUser,
	getUser,
	updateUser,
} from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const userRoute = express.Router();

userRoute.get('/get/:id', verifyToken, getUser);
userRoute.delete('/delete/:id', verifyToken, deleteUser);
userRoute.put('/update/:id', verifyToken, updateUser);

export default userRoute;
