import express from 'express';
import { createUser, loginUser } from '../controllers/authController.js';

const authRoute = express.Router();

authRoute.post('/create', createUser);
authRoute.post('/login', loginUser);

export default authRoute;
