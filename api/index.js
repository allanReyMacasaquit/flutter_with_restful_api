import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRouter from './routes/productRoute.js';

dotenv.config();
mongoose
	.connect(process.env.MONGO_DB)
	.then(() => console.log('Connected to Mongo DB'))
	.catch((error) => console.log(error));

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/api', productRouter);

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Sneaker app listening on port ${port}!`));
