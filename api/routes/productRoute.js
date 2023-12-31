import express from 'express';
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	searchProduct,
	updateProduct,
} from '../controllers/productsController.js';

const productRouter = express.Router();

productRouter.post('/create', createProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.get('/search/:key', searchProduct);
productRouter.delete('/delete/:id', deleteProduct);
productRouter.put('/update/:id', updateProduct);

export default productRouter;
