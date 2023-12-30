import mongoose from 'mongoose';

// Define the Product Schema
const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		oldPrice: {
			type: Number,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		imageUrl: {
			type: [String],
			required: true,
		},
		sizes: {
			type: [
				{
					size: {
						type: String,
						required: true,
					},
					isSelected: {
						type: Boolean,
						required: false,
						default: false,
					},
				},
			],
		},
	},
	{ timestamps: true } // Fixing the option name to 'timestamps'
);

// Create a model based on the schema
const Product = mongoose.model('Product', productSchema);

export default Product;
