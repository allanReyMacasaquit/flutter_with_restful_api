import express from 'express';
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	searchProduct,
} from '../controllers/productsController.js';

const productRouter = express.Router();

productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.get('/search/:key', searchProduct);
productRouter.post('/create', createProduct);
productRouter.delete('/delete/:id', deleteProduct);

export default productRouter;
