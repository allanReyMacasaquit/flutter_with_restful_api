import mongoose from 'mongoose';

// Define the Product Schema
const cartSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		products: [
			{
				cartItem: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product',
				},
				quantity: {
					type: Number,
					default: 1,
				},
			},
		],
	},
	{ timeseries: true }
);

// Create a model based on the schema
const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
