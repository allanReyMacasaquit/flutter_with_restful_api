import mongoose from 'mongoose';

// Define the Product Schema
const orderSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		customerId: {
			type: String,
			required: true,
		},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
		},
		quantity: {
			type: Number,
			required: true,
		},
		subTotal: {
			type: Number,
			required: true,
		},
		total: {
			type: Number,
			required: true,
		},
		delivery_status: {
			type: String,
			required: true,
			default: 'pending',
		},
		payment_status: {
			type: String,
			required: true,
		},
	},
	{ timeseries: true }
);

// Create a model based on the schema
const Order = mongoose.model('Order', orderSchema);

export default Order;
