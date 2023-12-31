import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRouter from './routes/productRoute.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import orderRoute from './routes/orderRoute.js';
import cartRoute from './routes/cartRoute.js';

dotenv.config();
mongoose
	.connect(process.env.MONGO_DB)
	.then(() => console.log('Connected to Mongo DB'))
	.catch((error) => console.log(error));

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/product', productRouter);
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/order', orderRoute);
app.use('/cart', cartRoute);

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Sneaker app listening on port ${port}!`));
