import mongoose from 'mongoose';

// Define the Product Schema
const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			default: 'CANADA',
		},
	},
	{ timestamps: true }
);

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

export default User;
