import Product from '../models/Products.js';

export async function createProduct(req, res) {
	try {
		const {
			name,
			title,
			category,
			description,
			oldPrice,
			price,
			imageUrl,
			sizes,
		} = req.body;

		// Create a new product in the database using the create() method and the provided schema
		const createdProduct = await Product.create({
			name,
			title,
			category,
			description,
			oldPrice,
			price,
			imageUrl,
			sizes,
		});
		console.log(createdProduct);
		return res.status(200).json(createdProduct); // Return the newly created product
	} catch (error) {
		throw new Error(`Error creating product: ${error.message}`);
	}
}

// GetAllProducts function definition
export async function getAllProducts(req, res) {
	try {
		// Retrieve all products from the database using the find() method
		const allProducts = await Product.find().sort({ createdAt: -1 });

		res.status(200).json(allProducts); // Return an array containing all products
	} catch (error) {
		res
			.status(500)
			.json({ error: `Error getting all product: ${error.message}` });
	}
}

// GetProductById function definition
export async function getProductById(req, res) {
	const productId = req.params.id;
	try {
		// Find a product by its ID using the findById() method
		const product = await Product.findById(productId);

		if (!product) {
			throw new Error('Product not found');
		}

		res.status(200).json(product); // Return the found product
	} catch (error) {
		res
			.status(500)
			.json({ error: `Error getting the product: ${error.message}` });
	}
}

export async function searchProduct(req, res) {
	const pipeline = [
		{
			$search: {
				index: 'shoes',
				text: {
					query: req.params.key,
					path: {
						wildcard: '*',
					},
				},
			},
		},
	];
	try {
		const results = await Product.aggregate(pipeline);
		res.status(200).json(results);
	} catch (error) {
		res
			.status(500)
			.json({ error: `Error searching product: ${error.message}` });
	}
}

export const deleteProduct = async (req, res) => {
	try {
		const product = req.params.id;

		// Find the product by ID and delete it
		const deletedProduct = await Product.findByIdAndDelete(product); // Removed unnecessary object wrapping

		if (!deletedProduct) {
			return res.status(404).json({ error: 'Product not found' });
		}

		res
			.status(200)
			.json({ message: 'Product deleted successfully', deletedProduct });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: `Error deleting the product: ${error.message}` });
	}
};

export async function updateProduct(req, res) {
	try {
		const productId = req.params.id;
		const {
			name,
			title,
			category,
			description,
			oldPrice,
			price,
			imageUrl,
			sizes,
		} = req.body;

		// Find the product by ID and update its details
		const updatedProduct = await Product.findByIdAndUpdate(
			productId,
			{
				$set: {
					name,
					title,
					category,
					description,
					oldPrice,
					price,
					imageUrl,
					sizes,
				},
			},
			{ new: true } // Return the updated document
		);

		if (!updatedProduct) {
			return res.status(404).json({ error: 'Product not found' });
		}

		return res.status(200).json(updatedProduct); // Return the updated product
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ error: `Error updating the product: ${error.message}` });
	}
}
